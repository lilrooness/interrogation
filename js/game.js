(function() {

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var WIDTH = 640;
  var HEIGHT = 480;

  var NODE_WIDTH = 100;
  var NODE_HEIGHT = 12;

  var Node = function(x, y, string) {
    this.x = x;
    this.y = y;

    this.width = NODE_WIDTH;
    this.height = NODE_HEIGHT; // we want the box to draw around the text which treats 0,0 as the bottom left, rather than top left

    this.string = string;
  }

  Node.prototype = new Entity();

  Node.prototype.draw = function(ctx) {
    ctx.fillText(this.string, this.x, this.y);
  }

  var Person = function(name, job, hobbies, family) {
    this.name = name;
    this.job = job;
    this.hobbies = hobbies;
    this.family = family;
    this.possessive_pronoun = "his";
    this.subject_pronoun = "he";
    this.object_pronoun = "him";
  };

  var generate_person = function(name) {

    var mother = new Person("Moureen", "Analyst", ["Fine Art"], {});
    var father =  new Person("Eric", "Politician", ["Music", "Reading", "Cinema"], {});
    var p = new Person(name, "Agent", ["Fine Art", "Cinema"], {
      "mother": mother,
      "father": father
    });

    return p;
  };

  var get_subject_info = function(subject, person) {
    var info = [];
    // personal job
    if(person.job == subject) {
      info.push(person.subject_pronoun + " works as a " + person.job + "\n");
    }

    // personal hobbies
    if(person.hobbies.indexOf(subject) > -1) {
      info.push(person.subject_pronoun + " likes " + subject + "\n");
    }

    var familyMembers = Object.keys(person.family)

    for(var i = 0; i < familyMembers.length; i++) {
      var familyMember = familyMembers[i];
      // job
      if(person.family[familyMember].job == subject) {
        info.push(person.possessive_pronoun + " " + familyMember + " works as a " + subject + "\n");
      }

      // hobbies
      if(person.family[familyMember].hobbies.indexOf(subject) > -1) {
        info.push(person.possessive_pronoun + " " + familyMember + " likes " + subject + "\n");
      }
    }

    return info;

  };

  var resolveNode = function(nodeString) {
    for(var i in nodes) {
      if(nodeString == nodes[i]) {
        return i;
      }
    }
    return -1;
  };

  var get_options = function(node) {
    var nodeIndex = resolveNode(node);
    var adjIndexes = adjecencies[nodeIndex];

    var options = [];

    for(var i in adjIndexes) {
      options.push(nodes[adjIndexes[i]]);
    }

    return options;
  };

  var get_random_start_topic = function(person) {
    var start_points = person.hobbies.concat(person.family["father"].hobbies.concat(person.family["mother"].hobbies));
    var rIndex = Math.floor(Math.random() * start_points.length);
    return start_points[rIndex];
  };

  var person = generate_person("David");
  var currentTopic = get_random_start_topic(person);
  var currentNode = new Node(WIDTH / 2, HEIGHT / 2, currentTopic);
  var optionNodes = [];

  var update = function() {
    var stringOptions = get_options(currentNode.string);
    currentNode.x = WIDTH / 2;
    currentNode.y = HEIGHT / 2

    optionNodes = []
    for(var i=0; i<stringOptions.length; i++) {
      var pos = random_center(WIDTH, HEIGHT, 300);
      optionNodes.push(new Node(pos.x, pos.y, stringOptions[i]));
    }
    console.log(get_subject_info(currentNode.string, person));
  }

  update();

  var draw = function() {
    ctx.textBaseline = 'hanging';
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.font = "12px serif"
    ctx.fillStyle = "grey";
    currentNode.draw(ctx);

    ctx.fillStyle = "white";
    for(var i=0; i<optionNodes.length; i++) {
      optionNodes[i].draw(ctx);
      ctx.strokeRect(optionNodes[i].x, optionNodes[i].y, optionNodes[i].width, optionNodes[i].height);
      ctx.beginPath();
      ctx.moveTo(optionNodes[i].x, optionNodes[i].y);
      ctx.lineTo(currentNode.x, currentNode.y);
      ctx.stroke();
    }
  };

  canvas.addEventListener("click", function(event) {
    var foundCollision = false;
    for(var i=0; i<optionNodes.length && !foundCollision; i++) {
      if(event.clientX > optionNodes[i].x 
        && event.clientX < optionNodes[i].x + optionNodes[i].width
        && event.clientY > optionNodes[i].y 
        && event.clientY < optionNodes[i].y + optionNodes[i].height) {
        
        foundCollision = true;
        currentNode = optionNodes[i];
        update();
      }
    }
  });

  setInterval(function() {
    draw();
  }, 1000 / 60);

})();
