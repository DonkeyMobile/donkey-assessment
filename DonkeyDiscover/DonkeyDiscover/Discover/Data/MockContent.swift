//
//  MockContent.swift
//  DonkeyDiscover
//
//  Created by Daniel Kwetschas on 03.10.26.
//

struct MockContent {
    let sectionTitles: [String]
    let items: [(title: String, description: String)]
}

extension MockContent {
    init(kind: DiscoverSection.Kind) {
        switch kind {
        case .hero:
            self = .hero
        case .featured:
            self = .featured
        case .group:
            self = .group
        case .banner:
            self = .banner
        case .grid:
            self = .grid
        case .list:
            self = .list
        }
    }

    private static let hero = MockContent(
        sectionTitles: ["This Sunday", "Don't Miss", "Highlight"],
        items: [
            (
                "Easter Weekend",
                """
                Three services, one story. On Friday we remember the cross in a quiet evening \
                service. On Saturday the youth host a night of music and prayer. On Sunday we \
                celebrate with breakfast, a family service and an egg hunt for the kids. Bring a \
                friend.
                """
            ),
            ("Night of Worship", "An evening of songs, prayer and quiet."),
            (
                "Summer Camp 2027",
                """
                Five days of games, friends and faith for ages 8 to 14. The kids sleep in cabins \
                by the lake, hike, canoe and spend the evenings around the fire with songs and \
                stories. Registration opens in March and places usually go fast.
                """
            ),
            ("Church Picnic", "Food, music and the whole church family in the park."),
        ]
    )

    private static let featured = MockContent(
        sectionTitles: ["Daily Inspiration", "Stories of Hope", "This Week"],
        items: [
            (
                "Morning Light",
                """
                A five-minute reflection on Psalm 19 to start your day with gratitude. The heavens \
                declare the glory of God, and so does the first light on your kitchen table. Read \
                the psalm slowly, notice one thing you are thankful for, and carry it with you \
                into the day.
                """
            ),
            ("Rest for the Weary", "Why Sabbath matters more than ever in a busy week."),
            ("Small Acts", "Stories of kindness from our community this month."),
            (
                "Grace in the Ordinary",
                """
                Finding God in the dishes, the commute and the waiting room. Most of life happens \
                in moments nobody posts about. This week we look at how faith can live right \
                there, in the repeated, unremarkable things, and why they might be holier than we \
                think.
                """
            ),
            ("A Prayer for Today", "Short words to carry with you through the day."),
            ("Faith at Work", "What it means to love your neighbour from nine to five."),
            (
                "Learning to Listen",
                """
                How slowing down opens room for God and for each other. We talk a lot, to friends, \
                to colleagues and in our prayers. A short guide to silence, to asking good \
                questions and to hearing what is said between the lines.
                """
            ),
            ("Room at the Table", "Hospitality stories from homes across our church."),
        ]
    )

    private static let group = MockContent(
        sectionTitles: ["Groups near you", "Bible Studies", "Serve Together"],
        items: [
            ("Young Adults", "42 members · Thursdays"),
            ("Parents & Toddlers", "18 members · Tuesdays"),
            ("Men's Breakfast", "25 members · Monthly"),
            ("Women's Circle", "12 members · Sundays"),
            ("Alpha Course", "31 members · Wednesdays"),
            ("Prayer Team", "9 members · Fridays"),
            ("Welcome Team", "14 members · Sundays"),
            ("Youth Group", "37 members · Fridays"),
            ("Seniors' Coffee", "16 members · Mondays"),
            ("Choir", "22 members · Thursdays"),
        ]
    )

    private static let banner = MockContent(
        sectionTitles: ["Sermon of the Week", "From the Pastor", "Listen Again"],
        items: [
            (
                "Living Hope",
                "When the week feels heavy, what does hope look like? Listen to Sunday's message."
            ),
            (
                "A Letter to Our Church",
                """
                A few honest words about the year ahead and the people who make this place home. \
                We have grown, we have said goodbye to some dear friends, and we have big plans \
                for the old hall. Our pastor shares what she hopes for, what worries her, and how \
                you can be part of it.
                """
            ),
            (
                "Faith in Small Steps",
                "Why the little choices of every day matter more than we think."
            ),
            (
                "The Long Road Home",
                """
                A story about leaving, returning and being welcomed back. Sunday's sermon on the \
                prodigal son, told from the view of the older brother, who never left and still \
                felt far away. Listen to the full message or read the notes.
                """
            ),
        ]
    )

    private static let grid = MockContent(
        sectionTitles: ["Find your people", "Grow in faith", "Get involved"],
        items: [
            ("Young Adults", "6 groups"),
            ("Families", "4 groups"),
            ("Bible Study", "9 groups"),
            ("Serve", "5 teams"),
            ("Prayer", "3 groups"),
            ("Music", "2 teams"),
            ("Seniors", "3 groups"),
            ("Students", "4 groups"),
        ]
    )

    private static let list = MockContent(
        sectionTitles: ["Worship & Music", "Listen Again", "Podcasts"],
        items: [
            ("Sunday Setlist", "8 songs · Worship team"),
            ("Quiet Hymns", "12 songs · For the evening"),
            ("Sermon Podcast", "New episode every Monday"),
            ("Worship Night Live", "Recorded in the main hall"),
            ("Kids Songs", "Sing along with the little ones"),
            ("Morning Prayer", "Ten quiet minutes to start the day"),
        ]
    )
}
