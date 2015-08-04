function letsStart() {
	
var questionNumber=0;
var questionCount = 1;
var questionBank=new Array();
var stage="#game1";
var stage2=new Object;
var questionLock=false;
var numberOfQuestions;
var score=0;
var qrnd;

var competence = document.getElementById('comp').value;		 

		/*if(competence == 'C1'){numberOfQuestions=20;} 
		else if(competence == 'C2'){numberOfQuestions=20;}
		else if(competence == 'C3'){numberOfQuestions=5;}
		else if(competence == 'C4'){numberOfQuestions=5;}
		else if(competence == 'C5'){numberOfQuestions=10;}
		else if(competence == 'C6'){numberOfQuestions=5;}
		else if(competence == 'C7'){numberOfQuestions=5;}
		else if(competence == 'C8'){numberOfQuestions=10;}
		else if(competence == 'C9'){numberOfQuestions=10;}
		else if(competence == 'C10'){numberOfQuestions=10;}
		else if(competence == 'C11'){numberOfQuestions=20;}
		else if(competence == 'C12'){numberOfQuestions=20;}
		else if(competence == 'C13'){numberOfQuestions=20;}
		else if(competence == 'C14'){numberOfQuestions=5;}
		else if(competence == 'C15'){numberOfQuestions=5;}
		else if(competence == 'C16'){numberOfQuestions=5;}
		else if(competence == 'C17'){numberOfQuestions=10;}
		else if(competence == 'C18'){numberOfQuestions=5;}
		else if(competence == 'C19'){numberOfQuestions=5;}
		else{numberOfQuestions=5;}*/
		
		 

 
 		$.getJSON('qEngine/' + competence + '.json', function(data) {

		for(i=0;i<data.quizlist.length;i++){ 
			questionBank[i]=new Array;
			questionBank[i][0]=data.quizlist[i].question;
			questionBank[i][1]=data.quizlist[i].option1;
			questionBank[i][2]=data.quizlist[i].option2;
			questionBank[i][3]=data.quizlist[i].option3;
		}

		numberOfQuestions=questionBank.length;
		qrnd=Math.random()*numberOfQuestions;
		qrnd=Math.ceil(qrnd);
		displayQuestion();
		})//gtjson
 
 



function displayQuestion(){
$(stage).append('<h2 style="color:blue;">Question '+questionCount+' of '+numberOfQuestions+'</h3>');
 var rnd=Math.random()*3;
rnd=Math.ceil(rnd);
 var q1;
 var q2;
 var q3;

if(rnd==1){q1=questionBank[qrnd][1];q2=questionBank[qrnd][2];q3=questionBank[qrnd][3];}
if(rnd==2){q2=questionBank[qrnd][1];q3=questionBank[qrnd][2];q1=questionBank[qrnd][3];}
if(rnd==3){q3=questionBank[qrnd][1];q1=questionBank[qrnd][2];q2=questionBank[qrnd][3];}

$(stage).append('<div class="questionText">'+questionBank[qrnd][0]+'</div><div id="1" class="option">'+q1+'</div><div id="2" class="option">'+q2+'</div><div id="3" class="option">'+q3+'</div>');

 $('.option').click(function(){
  if(questionLock==false){
  	questionLock=true;
window.scrollTo(0,document.body.scrollHeight);
  //correct answer
  if(this.id==rnd){
   $(stage).append('<div class="alert alert-success" role="alert"><b>Correct!</b> Well done</div>');
   score++;
   }
  //wrong answer	
  if(this.id!=rnd){
   $(stage).append('<div class="alert alert-danger" role="alert"><b>Wrong!</b> Answer: '+questionBank[qrnd][1]+'</div>');
  }
  $(stage).append('<button type="button" class="btn btn-primary next" id="clickME">Next</button>');
  $('.next').click(function(){changeQuestion();});
  //setTimeout(function(){changeQuestion()},1000);
 }})
}//display question

	
	
	
	
	
	function changeQuestion(){
		
		questionNumber++;
		questionCount++;
		qrnd++;
		if (qrnd>numberOfQuestions){qrnd = 0;}
	//if(stage=="#game1"){stage2="#game1";stage="#game2";}
		//else{stage2="#game2";stage="#game1";}
	
	if(questionNumber<numberOfQuestions){$(stage).empty();questionLock=false;displayQuestion();}else{displayFinalSlide();}
	
	 //$(stage2).animate({"right": "+=800px"},"slow", function() {$(stage2).css('right','-800px');$(stage2).empty();});
	//$(stage).animate({"right": "+=800px"},"slow", function() {questionLock=false;});
	}//change question
	

	
	
	function displayFinalSlide(){
		$(stage).empty();
		$(stage).append('<div class="questionText">You have finished the quiz!<br><br>Total questions: '+numberOfQuestions+'<br>Correct answers: '+score+'</div>');
		var perCent = (score/numberOfQuestions)*100;
		$(stage).append('<p class="text-info">Your score percentage:</p>');
		$(stage).append('<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="'+score+'" aria-valuemin="0" aria-valuemax="'+numberOfQuestions+'" style="width: '+perCent+'%;">'+perCent+'%</div></div>');
		$(stage).append('<button type="button" class="btn btn-success"><a href="index.html" style="color:white;">Retake</a></button>');
	}//display final slide
	
	
	
	
	
	
	
	}//doc ready