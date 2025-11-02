# Android developer assessment - Evert Smits

## Opdracht omschrijving
### Requirements
Permalink: Requirements
1. Kotlin
2. Android Views
3. Large dataset.
4. Unit tests
### Description
Permalink: Description
A user is member of several groups. The timeline of these groups contains inspiring content and can be scrolled infinitely. The content can contain images and text.
1. Create the app.
2. Add relevant unit tests.
3. Create a pull request on this repository.
   Happy coding! 🤓

## App aanpak
- Clean architecture voor nette opzet
    - Data layer
        - Data provider
            - User
                - ID
                - Username
                - password
                - Communitiy ID's
            - Posts list per Community
                - Posts lijst
                    - Image
                    - Title
                    - Message
                    - User ID
            - Community
                - ID
                - Name
        - Repository
            - Gebruikt dataprovider en levert een mapped input op
        - Authenticator
          - login, logout en beheert user
    - Domain
        - Models
            - User
            - Community
            - Post
        - UseCases
            - LoginUser
            - LogoutUser
            - GetCommunitiesForCurrentUser
            - GetCommunity
            - GetCurrentuser
    - Presentation
        - LoginFragment
            - Fake login gebasseerd op username + pw combinatie
        - HomeFragment
            - ViewPager (page per community)
                - CommunityFragment
                    - RecyclerView
                        - Posts
                          - Optionele image
                          - Title
                          - Message
                          - Timestamp
                          - User
        - ProfileFragment
          - profiel info
          - uitloggen
## Build info
- Android Studio Narwhal 3 Feature Drop 2025.1.3
- Jvm 18
- Gradle 8.14.3

## INFO VOOR JORDY & HENRIK
- Login Jordy:
  - Username: jordy_donkeymobile
  - Password: TestJordy1234
- Login Henrik:
  - Username: henrik_donkeymobile
  - Password: TestHenrik1234