function levenshteinDistance(string1, string2) {
  var matrix = new Array();

  for(var i = 0; i <= string1.length; i++) {
    matrix[i] = [i];
  }

  for(var j = 0; j <= string2.length; j++) {
    matrix[0][j] = j;
  }

  for(var i = 1; i <= string1.length; i++) {
    for(var j = 1; j <= string2.length; j++) {
      if(string1[i - 1] == string2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i][j - 1], matrix[i - 1][j], matrix[i - 1][j - 1]) + 1;
      }
    }
  }


  return matrix[string1.length][string2.length];
}

function DidYouMean(words, maxDistance) {
  this.words = words;
  this.root = new BKNode(words[0]);
  this.maxDistance = maxDistance || 2;

  this.construct();
}

DidYouMean.prototype = {
  construct: function() {
    for(var i = 1; i < this.words.length; i++) {
      var word = this.words[i];
      var currentNode = this.root;
	  
      var distance = levenshteinDistance(word, currentNode.word);

	    while(typeof currentNode.children[distance - 1] != 'undefined') {
	  	  currentNode = currentNode.children[distance - 1];
		    distance = levenshteinDistance(word, currentNode.word);
	    }
	  
	    currentNode.children[distance - 1] = new BKNode(word, distance);
    }
  },
  
  query: function(term) {
	  var results = [];
    
	  this.inspectNode(term, this.root, results);
    return results;
  },
  
  inspectNode: function(term, node, results) {
	  var distance = levenshteinDistance(term, node.word);

	  if(distance <= this.maxDistance) {
	    results.push(node.word);
	  }
	  
	  var min = Math.max(1, distance - this.maxDistance);
	  var max = distance + this.maxDistance;
    
    for(var i = min - 1; i <= max - 1; i++) {
      if(typeof node.children[i] != 'undefined') {
        this.inspectNode(term, node.children[i], results);
      }
    }
  }
}

function BKNode(word, n) {
  this.word = word;
  this.n = n;
  this.children = [];
}
