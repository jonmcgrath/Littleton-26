// Hike data for the Littleton, NH weekend hikes site.
// Edit this file to add, remove or tweak hikes. No build step needed.
//
// Notes on data quality:
// - Distances, elevation gain and times come from the linked trail sources and vary a little between them.
//   Ranges are shown where sources disagree.
// - Drive times are estimates from Littleton. Waze shows the live ETA once you tap a button.
// - Trailhead coordinates are approximate. Waze also gets a name/address search so it can snap to the right spot.
//   Check the pin Waze shows before you drive.

window.SITE = {
  home: { name: "Littleton, NH", lat: 44.3059, lon: -71.7701 },
  // Point forecasts (National Weather Service). Mountain weather is colder and windier than town.
  forecasts: [
    { label: "Littleton forecast", url: "https://forecast.weather.gov/MapClick.php?lat=44.3059&lon=-71.7701" },
    { label: "Franconia Notch forecast", url: "https://forecast.weather.gov/MapClick.php?lat=44.14&lon=-71.68" }
  ],
  generalLinks: [
    { label: "Franconia Notch State Park (NH State Parks)", url: "https://www.nhstateparks.org/find-parks-trails/franconia-notch-state-park" },
    { label: "Franconia Notch hiking map 2026 (PDF)", url: "https://www.nhstateparks.org/NHStateParks/media/NHStateParks/PDFs/Maps/26_NHSP_FNSP_HikingMap_v4.pdf" },
    { label: "NH Fish & Game hunting seasons", url: "https://www.wildlife.nh.gov/hunting-nh" }
  ],
  checklist: [
    "Sunset comes early in late October. The 'Start by' time on each card leaves a one-hour buffer.",
    "Carry a headlamp, a warm layer and a hat. Summits and ledges run colder and windier than town.",
    "Wet leaves and ledges are slippery. Poles or traction help on the steep sections.",
    "Hunting seasons are open in parts of New Hampshire in late October. Wear blaze orange outside state parks.",
    "Check conditions the morning of the hike. Trails can ice over at elevation after a cold night."
  ]
};

window.HIKES = [
  {
    id: "lonesome-lake",
    name: "Lonesome Lake",
    area: "Franconia Notch State Park",
    difficulty: "Moderate",
    distance: "3.2–4 mi round trip",
    gain: "about 1,000 ft",
    time: { label: "2–3.5 h", maxHours: 3.5 },
    drive: "about 25 min (est.)",
    summary:
      "A steady, rocky climb of about 1.2 miles up from the notch floor to a mountain tarn. The lakeshore trail and plank walkways give you big views of the Franconia Ridge. The AMC hut sits at the far end.",
    highlights: [
      "Views across the lake to Mount Lafayette and the Franconia Ridge",
      "Loop the shore on the Around-Lonesome-Lake Trail (about 0.8 mi) before heading down",
      "Dogs are allowed on the Lonesome Lake Trail itself, but not on the Hi-Cannon Trail branch"
    ],
    watch: [
      "Steep, boulder-filled sections. Wear real footwear.",
      "Franconia Notch lots fill early on fall weekends. Arrive before 9:00 am."
    ],
    stops: [
      {
        label: "Lafayette Place trailhead",
        q: "Lafayette Place Campground, Franconia Notch, NH",
        lat: 44.14,
        lon: -71.6815
      }
    ],
    links: [
      { label: "NH State Parks trail guide", url: "https://blog.nhstateparks.org/?p=9991", kind: "info" },
      { label: "OnX route page", url: "https://www.onxmaps.com/hiking/jn2qv4kpxq95/lonesome-lake-trail", kind: "info" },
      { label: "Komoot highlight", url: "https://www.komoot.com/highlight/4258420", kind: "map" },
      { label: "Franconia Notch hiking map 2026 (PDF)", url: "https://www.nhstateparks.org/NHStateParks/media/NHStateParks/PDFs/Maps/26_NHSP_FNSP_HikingMap_v4.pdf", kind: "map" }
    ]
  },
  {
    id: "notch-combo",
    name: "Notch Combo: Artists Bluff + Bald Mountain, then Kinsman Falls",
    area: "Franconia Notch State Park",
    difficulty: "Easy to moderate",
    distance: "about 3–3.5 mi total (two short hikes)",
    gain: "roughly 300 ft + 400 ft (est.)",
    time: { label: "2–3.5 h plus a 10 min drive between", maxHours: 3.75 },
    drive: "15–25 min (est.)",
    summary:
      "Two short hikes that add up to a solid half day. Start with the open ledges of Artists Bluff and Bald Mountain for the fall color over Echo Lake and Cannon. Then drive south to the Basin and follow Cascade Brook to Kinsman Falls and Rocky Glen Falls.",
    highlights: [
      "Artists Bluff and Bald Mountain: a loop of about 1.2–1.5 mi with ledge views of the notch",
      "Kinsman Falls is about 0.5 mi up from the Basin, with Rocky Glen Falls about 0.5 mi beyond",
      "Pets are allowed on leash at Artists Bluff"
    ],
    watch: [
      "The bluff loop has short steep sections and a ledge scramble on the Bald Mountain spur.",
      "The Peabody Slopes lot can be closed when the ski area is shut. If so, use the signed pull-off just off the road.",
      "Times for the combined day are my estimate, not from a single source."
    ],
    stops: [
      {
        label: "1. Artists Bluff / Bald Mountain lot",
        q: "Peabody Slopes parking, Cannon Mountain, Franconia, NH",
        lat: 44.183,
        lon: -71.7038
      },
      {
        label: "2. The Basin (Kinsman Falls)",
        q: "The Basin, Franconia Notch State Park, Lincoln, NH",
        lat: 44.1155,
        lon: -71.6806
      }
    ],
    links: [
      { label: "Artists Bluff and Bald Mountain (Trail Finder)", url: "https://www.trailfinder.info/trails/trail/franconia-notch-state-park-bald-mountain-artist-s-bluff", kind: "info" },
      { label: "Artists Bluff loop (Outdoor Project)", url: "https://www.outdoorproject.com/node/8729", kind: "info" },
      { label: "Kinsman Falls (Outdoor Project)", url: "https://www.outdoorproject.com/node/7275", kind: "info" },
      { label: "Franconia Notch waterfalls (NH State Parks)", url: "https://blog.nhstateparks.org/the-waterfalls-of-franconia/", kind: "info" },
      { label: "Bald Mountain route (Komoot)", url: "https://www.komoot.com/smarttour/e1180556219/bald-mountain-via-artist-s-bluff-e-loop-trail-franconia-notch-state-park", kind: "map" },
      { label: "Franconia Notch hiking map 2026 (PDF)", url: "https://www.nhstateparks.org/NHStateParks/media/NHStateParks/PDFs/Maps/26_NHSP_FNSP_HikingMap_v4.pdf", kind: "map" }
    ]
  },
  {
    id: "littleton-combo",
    name: "Littleton Combo: Kilburn Crags + Pine Hill",
    area: "Littleton",
    difficulty: "Easy to moderate",
    distance: "about 3 mi total (est.)",
    gain: "roughly 400–500 ft total (est.)",
    time: { label: "2–2.5 h (est.)", maxHours: 2.5 },
    drive: "about 5 min",
    summary:
      "The easy local option. Kilburn Crags is a short climb to a ledge with a view over Littleton, the Ammonoosuc valley, the Presidentials and Franconia Ridge. Pine Hill is a short loop with a stone staircase and glacial boulders, reached from Remich Park in town.",
    highlights: [
      "Kilburn Crags: 1.4–1.8 mi round trip to a view at about 1,300 ft",
      "Pine Hill: a primary 1-mile loop with spur trails, in a network of about 2.2 mi",
      "Lowest-risk pick if the forecast turns or you start late"
    ],
    watch: [
      "Kilburn Crags parking is a small pull-off for about four cars. Carpool if you can.",
      "Pine Hill trails are shared with mountain bikes. Stay alert on weekends.",
      "Each hike alone is under two hours. The combo is my pairing to reach your time range."
    ],
    stops: [
      {
        label: "1. Kilburn Crags trailhead",
        q: "253 St Johnsbury Rd, Littleton, NH 03561"
      },
      {
        label: "2. Pine Hill (Remich Park)",
        q: "Remich Park, Pine Hill Road, Littleton, NH"
      }
    ],
    links: [
      { label: "Kilburn Crags (Trail Finder)", url: "https://trailfinder.info/trails/trail/kilburn-crag", kind: "info" },
      { label: "Kilburn Crags guide (Visit White Mountains)", url: "https://www.visitwhitemountains.com/blog/post/quick-winter-hikes-in-the-white-mountains-kilburn-crags/", kind: "info" },
      { label: "Pine Hill Trails (Trail Finder)", url: "https://trailfinder.info/trails/trail/pine-hill-trails", kind: "map" },
      { label: "Pine Hill (Komoot highlight)", url: "https://www.komoot.com/highlight/7807904", kind: "map" }
    ]
  },
  {
    id: "sugarloaf",
    name: "North and Middle Sugarloaf",
    area: "Twin Mountain (White Mountain National Forest)",
    difficulty: "Moderate",
    distance: "3.3–3.4 mi round trip",
    gain: "about 1,100 ft",
    time: { label: "2–2.5 h", maxHours: 2.5 },
    drive: "30–35 min (est., borderline)",
    summary:
      "Two small summits with open ledges and strong views of the Twin, Rosebrook and Presidential ranges. It is the best view-for-effort ratio in this list. Climb to the saddle, then visit North Sugarloaf (0.3 mi) and Middle Sugarloaf (0.4 mi).",
    highlights: [
      "Open ledges on both summits with Presidential Range views",
      "Large glacial boulders along the trail",
      "Dogs are allowed per the Outdoor Project listing"
    ],
    watch: [
      "Zealand Road is gated in winter. In late October it is usually open, but confirm. If it is gated, add about 1 mile each way on foot.",
      "Steep in places. Leaves on rock make the descent slick.",
      "At the trailhead, cross the bridge and follow the 'Sugarloaf Trail' sign, not the Trestle Trail.",
      "If Waze drops the pin in the wrong place, search 'Zealand Road, Twin Mountain NH' and drive 0.9 mi to the lot on the right."
    ],
    stops: [
      {
        label: "Sugarloaf trailhead, Zealand Road",
        q: "Sugarloaf Trailhead, Zealand Road, Twin Mountain, NH"
      }
    ],
    links: [
      { label: "Section Hiker guide", url: "https://sectionhiker.com/great-hikes-north-and-middle-sugarloaf/", kind: "info" },
      { label: "Outdoor Project listing", url: "https://outdoorproject.com/node/10262", kind: "info" },
      { label: "Hike New England trip report", url: "https://hikenewengland.com/SugarloafLittleR001118.php", kind: "info" },
      { label: "OnX route page", url: "https://www.onxmaps.com/hiking/mgd6g7p806o9/sugarloaf-trail", kind: "map" }
    ]
  },
  {
    id: "mount-pemigewasset",
    name: "Mount Pemigewasset (Indian Head)",
    area: "Franconia Notch State Park, Lincoln",
    difficulty: "Moderate (steep)",
    distance: "3.4–3.8 mi round trip",
    gain: "about 1,250 ft",
    time: { label: "2.5–3.5 h", maxHours: 3.5 },
    drive: "33–38 min (est., borderline)",
    summary:
      "A steep, steady climb to open granite ledges at 2,557 ft with views of the notch, the Franconia Range and the valley to the south. It is a popular hike, so go early.",
    highlights: [
      "Ledge summit with views of the notch, Franconia Range and Liberty and Flume",
      "Two routes: the Mount Pemigewasset Trail from the Flume Visitor Center, or the Indian Head Trail from a gravel lot just south of Indian Head Resort",
      "Good late-season fall color from the summit"
    ],
    watch: [
      "This one is slightly outside your 30 minute radius. It is here as the stretch option.",
      "I could not confirm Flume Visitor Center lot access for late October. If it is closed, use the Indian Head Trail lot.",
      "The upper section is steep and rocky. Ledges are dangerous when icy."
    ],
    stops: [
      {
        label: "Flume Visitor Center (Mt. Pemigewasset Trail)",
        q: "Flume Gorge Visitor Center, Franconia Notch Parkway, Lincoln, NH"
      },
      {
        label: "Alternate: Indian Head Trail lot",
        q: "Indian Head Resort, US-3, Lincoln, NH"
      }
    ],
    links: [
      { label: "Trail Finder (state-park listing)", url: "https://trailfinder.info/trails/trail/franconia-notch-state-park-mount-pemigewasset", kind: "info" },
      { label: "Hike New England trip report", url: "https://hikenewengland.com/Pemigewasset000429.php", kind: "info" },
      { label: "Indian Head Trail (Hiking Project)", url: "https://www.hikingproject.com/trail/7044098/indian-head-trail", kind: "map" },
      { label: "Franconia Notch hiking map 2026 (PDF)", url: "https://www.nhstateparks.org/NHStateParks/media/NHStateParks/PDFs/Maps/26_NHSP_FNSP_HikingMap_v4.pdf", kind: "map" }
    ]
  }
];
