To learn french, its best to first learn the first 1000 commonly used words in french and memorize it. 

This app allows the user to do just that. 

Common french words are taken from this list: <https://strommeninc.com/1000-most-common-french-words-frequency-vocabulary/>

This app tries to gamify the learning experience of memorizing these 1000 words. 

First we break down the 1000 words into 10 word sets. This gives us 100  word sets. 

These 100 word sets are to be taken as levels. So the game has 100 levels. 

So the 'player' memorizes the first 10 words in the first level (i.e. word set) and then he moves on to the next level, for the next 10 words and so on. 

So the level needs to be designed as follows, 

The user needs to select the correct word from a list of 4 options. 3 are wrong, 1 is correct. 

E.g. 

COMME 

as       |    that    |   he    |   was 

Then the player needs to select the correct corresponding english word. 1/4 probability of correct guess. 

When we progress through the levels, the player is tested on the previous words as well, so that he remembers the previous words, and retains in his/her memory. 

If the user doesn't score full on the level (doesn't give all correct answers), the he fails the level, and needs to start the level again. 

The mastery level (precentage) is calculated by how many words he got correct in his latest run.  But the words list gets longer and longer the more level he/she is. In the 99th level, there are 990 words in total, but in the first level there are only 10 words. 

The player can quit praticing at anytime, and the progress would be saved in localstorage of the browser.  

The player object: 

\-----------------------

player = {

`	`'name': 'playerOne', 

`                `'level': 2, 

`	`'wordsWrong': ['comme', 'a' ... ] ,

`               `'wordsCorrect' : [comme', 'a' ... ]

`	`'currentWord': 'vous'

}

wordsCorrect  would have all the words the player covered in last session, currentWord is the word the player is at now.  Level is the level of the player. 

How to calculate mastery precentage: level 2 word set has 20 words, so wordsCorrect.length / 20 \* 100 gives us the precentage - which can be rounded down? 

The next word is to be selected at random, all the 3 options are to be selected at random as well. 

Future developments: Add a text to speech library to pronounce french words. 

Have the option to add multiple user profiles, and switch between them. 

An option to either show dark mode or light mode. (theme) 

A way for users to signup to an account or play locally. 

Draw a chart of the progress summary. <- requires some design work first. 

Pure javascript/css  and probably nodejs at some point. 

If the player fails a level, he/she gets demoted to the previous level. A player fails a level by getting 50% of the words wrong in the word set. So if the player is level 2, and if he gets 10 words wrong, he fails the level.



