package com.egsdevelopment.template.presentation.features.login.ui

import android.os.Bundle
import android.view.View
import androidx.core.view.isVisible
import androidx.core.widget.doOnTextChanged
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.egsdevelopment.template.presentation.R
import com.egsdevelopment.template.presentation.databinding.FragmentLoginBinding
import com.egsdevelopment.template.presentation.features.login.event.LoginEvent
import com.egsdevelopment.template.presentation.features.login.viewmodel.LoginViewModel
import com.egsdevelopment.template.presentation.features.util.collectWithLifeCycle
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.flow.collectLatest

@AndroidEntryPoint
class LoginFragment : Fragment(R.layout.fragment_login) {

    private var binding: FragmentLoginBinding? = null
    private val viewModel: LoginViewModel by viewModels()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding = FragmentLoginBinding.bind(view)
        initUI()
        initCollectors()
    }

    private fun initUI() {
        initClickListeners()
        initFieldListeners()
    }

    private fun initCollectors() {
        viewModel.loginButtonEnabled.collectWithLifeCycle(this, ::setLoginButtonEnabled)
        viewModel.event.collectWithLifeCycle(this, ::onEvent)
    }

    private fun initClickListeners() = binding?.apply {
        loginButton.setOnClickListener {
            viewModel.startLogin()
        }
    }

    private fun initFieldListeners() = binding?.apply {
        usernameInputField.doOnTextChanged { text, start, count, after ->
            viewModel.setUserName(text.toString())
        }
        passwordInputField.doOnTextChanged { text, start, count, after ->
            viewModel.setPassword(text.toString())
        }
    }

    private fun setLoginButtonEnabled(isEnabled: Boolean) = binding?.apply {
        loginButton.isEnabled = isEnabled
        loginButton.setBackgroundColor(
            resources.getColor(
                if (isEnabled) R.color.buttonColor else R.color.buttonColorDisabled,
                null
            )
        )
    }

    private fun onEvent(event: LoginEvent) {
        when (event) {
            LoginEvent.LoginFail -> onLoginFailure()
            LoginEvent.LoginSuccess -> {
                findNavController().navigate(R.id.action_loginFragment_to_homeFragment)
            }
        }
    }

    private fun onLoginFailure() {
        showLoginFailureMessage()
    }

    private fun showLoginFailureMessage() = binding?.apply {
        loginError.isVisible = true
    }

    override fun onDestroyView() {
        super.onDestroyView()
        binding = null
    }
}