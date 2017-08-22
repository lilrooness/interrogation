var nodes = {
 12: "Politician",
 13: "Police Officer",
 14: "Actor",
 16: "Musician",
 17: "Artist",
 18: "Engineer",
 19: "Scientist",
 20: "Solider",
 21: "Banker",
 22: "Spy",
 23: "Taylor",

 24: "Music",
 25: "Cinema",
 26: "Fine Art",
 27: "Books",
 28: "Author",
 29: "Reading"
};

var adjecencies = {
  12: [22],
  13: [20],
  14: [28, 16, 17, 24, 25],
  16: [14, 28, 17, 24],
  17: [14, 28, 16, 26],
  18: [19, 21],
  19: [18],
  20: [22],
  21: [18, 23],
  22: [12, 20],
  23: [17, 21],
  24: [16],
  25: [24, 14],
  26: [17],
  27: [28, 17, 29],
  28: [27, 29, 14, 16, 17],
  29: [27, 28]
};

var generate_random_hobby = function() {
  return "Books";
}

var generate_random_job = function() {
  return "Politician";
}