# Android developer assessment - Evert Smits

## LET OP ASSESSMENT IS NOG WORK IN PROGRESS

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
                - Id
                - Username
                - password
                - Groups
            - Timeline object per group
                - Posts list
                    - Image
                    - Text
                    - User
                    - Group id
            - Group
                - Id
                - Name
        - Repository
            - Gebruikt dataprovider en levert een mapped input op
    - Domain
        - Models
            - User
            - Group
            - Post
        - UseCases
            - LoginUser
            - GetGroupsForUserID
            - FetchPostsForGroupID
    - Presentation
        - SplashFragment
            - Nice logo
            - Nice gradient
        - LoginFragment
            - Fake login based on username + pw combination
        - HomeFragment
            - ViewPager (page per group)
                - GroupFragment
                    - RecyclerView
                        - Posts