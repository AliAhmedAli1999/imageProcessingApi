# imageProcessingApi

a Udacity Project for web development advanced track by FWD

## Introduction

the project is simply an API that check if the image is existed specific directory (images) and then resize that image with the specified width and height and create the image in another directory (processed-images)
in this readme file we will walk through the code and the unit tests

---

## The Code

the code is going through 3 steps (3 middleware) from the moment we enter the endpoint in our browser

### check if the image is existing in first place

we will check the name parameter in the endpoint and check if that name exist at our directory (images) if it's not we will stop the process and send a response with an error message specifying that the image does not exist

### check if the image hss been processed before with the same dimensions

here we will merge the name parameter with the width and height parameters so the resulting will be /name_width_height
and then check if that path exist at the directory which the precessed images are there (processed-images) if there is a match no need to do the process again we just send that image as a response (caching) if there is not we will go to the last stage (middleware)

### process the image

here we will check if the parameters are valid first if are not we will send a response with an error message , after that we will resize the image with the help of a third-party library (sharp) and then we will save the image into (processed-images) in
a format like that /imageName_width_height.jpg

![an example of an endpoint](./images/Screenshot%202022-10-20%20011624.png)

---

## the testing process

here we got a 11 different tests , contain all possible inputs that can a user entered the tests are :-

- check if the api is working
- check if the image exists
- check if the image does not exist
- check if the image processed before
- check if the image processed before but with different dimensions
- check if the process succeeded and the new image is created
- check if we entered invalid width
- check if we entered invalid height
- check if we entered invalid height and width
- check if we entered negative width
- check if we entered a 0 before the width

before each test we clean the (processed-images) folder so we can test the individual actions and see how the code will handle those actions , we used jasmine framework and superset library for writing the tests
![image for the tests](./images/Screenshot%202png.png.png)

---

## scripts for that code

if you go to the package.json you will find the scripts and all the other information relative to this project like the dependencies and devDependencies

### the scripts :-

- start : for starting the server
- test : for starting the unit tests
- build : for converting the typescript files to javascript
