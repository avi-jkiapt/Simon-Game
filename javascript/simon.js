var simon = {
  sequences :['#red','#green','#yellow','#blue'],
  compPlayer: [],
  humanPlayer: [],
  count : 0,
  strict:false,
  sound: {
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    green:new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    yellow:new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    blue:new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  }
};

function startSimon()
{
  simon.compPlayer =[];
  simon.humanPlayer =[];
  simon.count =0;
  increaseCount();
}

function increaseCount()
{
  simon.count++;

  setTimeout(function()
            {
    $('#level').html(simon.count);
  },300);
  randomCreate();
}

function lightUp(square)
{
  $(square).addClass('hover');
  playSound(square);
  setTimeout(function(){
    $(square).removeClass('hover');
  },500);
}

function animate()
{
  var i=0;
  var interval =setInterval(function()
  {
       lightUp(simon.compPlayer[i]);
       i++;
       if(i>=simon.compPlayer.length)
         {
           clearInterval(interval);
         }

  },600);
  clearCompPlayer();
}

function clearCompPlayer()
{
  simon.humanPlayer = [];
}

function randomCreate()
{
  var random= Math.floor(Math.random() * 4);
  var sequenc = simon.sequences[random];
  console.log(sequenc);
  simon.compPlayer.push(sequenc);
  animate();
}

function humanPlayerAdd(id)
{
  var sequence = '#' + id  ;
  simon.humanPlayer.push(sequence);
  var len= simon.humanPlayer.length -1;
  if(simon.humanPlayer[len]!==simon.compPlayer[len])
    {
      if(simon.strict)
        {
          $('#result').html('You lose! Try Again... ');
          startSimon();
        }
      else
        {
          $('#result').html('Wrong Choose !! Try Again ');
          animate();
        }
    }
  else
    {
       // $('#result').html('Good Job ...');
        // playSound(sequence);
    lightUp(sequence);

       var isLast= simon.humanPlayer.length===simon.compPlayer.length;
      if(isLast)
        {
            if(simon.count==20)
              {
                $('#result').html('Horray!!!  You won the Game!!! ');
              }
             else
               {
                 $('#result').html('Next level');
                 nextLevel();
               }
        }
    }
}

function nextLevel()
{
  increaseCount();
}

function playSound(name)
{
  if(name=='#green')
    {
      simon.sound.green.play();
    }
  else if(name=='#red')
    {
      simon.sound.red.play();
    }
  else if(name=='#yellow')
    {
      simon.sound.yellow.play();
    }
  else
    {
      simon.sound.blue.play();
    }
}

function strict()
{
  //console.log("strict");
  if(simon.strict==false)
    {
      simon.strict =true;
      $('#strict').html('ON');
     // console.log("strict1");
    }
  else
    {
      simon.strict=false;
      $('#strict').html('OFF');
     // console.log("strict");
    }
  startSimon();
}

startSimon();
