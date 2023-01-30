FEATURES ADDED
---------------
- Rules

- Timer

- Text
  - We have the random text (to be typed) that would be picked from an array of strings. This allows the user to have a variety of texts to type so they can continue challenging themselves. The numerous texts were all chosen from Harry Potter and the Philosopher's Stone, to keep within the theme of Harry Potter. I made sure that the text to be about 3 - 4 rows, since I believe this is around the optimum range for the text in typeracer games. Should the text be tremendously long, the player would just lose interest and focus at the halfway point. If it's too short, the user could just attain a high wpm easily, which defeats the purpose of the typeracer.
- Input area

- "Bar" 
  - In this section, I wanted to create a bar which would fill up based on the completion of the text. I was planning to implement it such that it would follow the percentage of the number of characters over the total number of characters. I would also have made the broom slowly follow the bar increase and reach the golden snitch (reference to Harry Potter Quidditch). Unfortunately, I did not have enough time to complete this aspect of the project as I had to focus on the indispensable elements of a typeracer first, before working on the aesthetics. 
- Results section
  - Time: The time is taken from the timer at the top right of the screen. After the user has keyed in the last character of the text, the time would also be reflected in the "time" section of the results for the user to see.
  - Wpm: After the user has finished typing the texts, they are required to hit the spacebar so that the wpm can load (i honestly don't know why it is like this). The wpm is calculated as such: number of words / time (in seconds) * 60. The wpm would then be reflected in the "wpm" section of the results so that the users can check out their speed.
  - Accuracy: My accuracy is based on the number of correctly / incorrectly typed characters there are AT THE END of the typeracer test. Thus, the users could change their incorrectly typed characters during the test and still achieve a 100% accuracy. To see whether the typing test is fully correct, I coded it such that all the characters of the text is checked to see whether it is the same to its corresponding input character. I used this method as it is much more complex to calculate the accuracy that is dependent on the number of times that a character is typed incorrectly during the typing test. Using my "easier" method, there are basically only 2 accuracy counters: 100% and Not 100% (which is clearly when there is an incorrectly typed character when the typing test is finished). This is then reflected in the "accuracy" section in the results.
  - Words: The number of words is based on input of the users. It counts the number of spaces inside the input, and when the user is typing, the number of words is always reflected in the "word" section in the results. When the user has reached the number of characters inside the entire text, the number of words that has been inputed would be recorded and also be used to calculate the wpm (so that the wpm would not change all the time, although the word count would still continue to increase should the user continue typing).
  
- Thanks
  - At the bottom of the webpage, I included 2 hyperlinks: One that would link to my Github page where it showcases the code and my write-ups, in the case that the users would like to check out the backend of the project. The second link sends the users to a Google Form where they could provide their comments of the game. Since Github only has pull requests as a form of a "comment section", this method allows a better and easier way to give comments about the game to me.

