package com.egsdevelopment.donkeymobile.data.post.mapper

import com.egsdevelopment.domain.authentication.model.user.User
import com.egsdevelopment.domain.post.model.Post
import com.egsdevelopment.donkeymobile.data.post.entity.PostEntity
import com.egsdevelopment.donkeymobile.data.user.entity.UserEntitiy
import com.egsdevelopment.donkeymobile.data.user.mapper.UserMapper
import com.egsdevelopment.donkeymobile.data.user.provider.UserProvider
import io.mockk.every
import io.mockk.mockk
import org.junit.Assert
import org.junit.Test

class PostMapperTest {

    @Test
    fun `test when user id in post is not a known user do not map post`() {
        //Given
        val userEntity = mockk<UserEntitiy>() { every { id } returns 4 }
        val user = mockk<User>() { every { id } returns 4 }
        val postEntity = mockk<PostEntity>() { every { userId } returns 3 }
        val postEntities = listOf(postEntity)
        val userEntities = listOf(userEntity)
        val users = listOf(user)

        val mockUserMapper = mockk<UserMapper>() {
            every { mapList(userEntities) } returns users
            every { map(userEntity) } returns user
        }
        val mockUserProvider = mockk<UserProvider>()
        every { mockUserProvider.provide() } returns userEntities

        val postMapper = PostMapper(
            userProvider = mockUserProvider,
            userMapper = mockUserMapper
        )

        //When
        val expected = emptyList<Post>()
        val result = postMapper.mapList(postEntities)

        //Then
        Assert.assertEquals(result, expected)
    }
}