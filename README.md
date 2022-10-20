# imageProcessingApi

a Udacity Project for web development advanced track by FWD

## Introduction

the project is simply an API that cheak if the image is exsited specific directory (images) and then resize that image with the specified width and height and create the image in another directory (processed-images)
in this readme file we will walk through the code and the unit stests

---

## The Code

the code is going through 3 steps (3 middlewares) from the momoent we enter the endpoint in our browser

### check if the image is exsiting in first place

we will check the name parameter in the endpoint and cheack if that name exist at our directory (images) if it's not we will stop the process and send a response with an error message specifuing that the image does not exist

### check if the image hss been processed before with the same dimensions

here we will merge the name parameter with the width and height parameters so the resulting will be /name_width_height
and then cheack if that path exist at the directory which the preocessed images are there (processed-images) if there is a match no need to do the process again we just send that image as a response (caching) if there is not we will go to the last stage (middleware)

### process the image

here we will cheack if the paramters are valid first if are not we will send a response with an error message , after that we will resize the image with the help of a third-party library (sharp) and then we will save the image into (processed-images) in
a format like that /imageName_width_height.jpg

![an example of an endpoint](./images/Screenshot%202022-10-20%20011624.png)

---

## the testing process

here we got a 11 diffrent tests , contain all possible inputs that can a user entered the tests are :-

- cheak if the api is working
- cheak if the image exsits
- cheak if the image does not exsit
- cheak if the image processed before
- cheak if the image processed before but with diffrent dimensions
- cheak if the process successed and the new image is created
- cheak if we enterd invalid width
- cheak if we enterd invalid height
- cheak if we enterd invalid height and width
- cheak if we enterd negative width
- cheak if we enterd a 0 before the width

before each test we clean the (processed-images) folder so we can test the indidual actions and see how the code will handle those actions , we used jasmine framework and superset library for writing the tests
![image for the tests](./images/Screenshot%202png.png.png)

---

## scripts for that code

if you go to the package.json you will find the scripts and all the other informations relative to this project like the dependencies and devDependencies

### the scripts :-

- start : for starting the server
- test : for starting the unit tests
- build : for converting the typesripts files to javascripts
