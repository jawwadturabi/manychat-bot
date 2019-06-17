var rq = require('request');
const express = require("express");
const bodyParser = require("body-parser");
const app = express().use(bodyParser.json());
const baseUrl = "https://usil.instructure.com/api/v1/"

app.get("/webhook", (request, response) => {
    var intent = request.params
    console.log("request is : ", intent);
    response.send({
        "version": "v2",
        "content": {
          "messages": [
            {
              "type": "text",
              "text": "simple text with button",
              "buttons": [
                {
                  "type": "url",
                  "caption": "External link",
                  "url": "https://manychat.com"
                }
              ]
            }
          ],
          "actions": [],
          "quick_replies": []
        }
    })
    
})
// var us_Id = request.params.usId
    // var courseId = request.params.courseId
    // var options = {
    //     url: baseUrl + "users/" + us_Id + "/courses/" + courseId + "/assignments",
    //     auth: {
    //         'bearer': '11286~cKNZP8SsHdUgk2vfmXGV0J3mfKGe3uyuv664oinBASOMr3MfxhDx5vZ9nNnrniG4'
    //     }
    // };
    // function callback(error, _res, body) {
    //     console.log("url = ", options.url)
    //     if (!error && response.statusCode == 200) {
    //         console.log("body is : ", body)
    //         var info = JSON.parse(body);
    //         console.log("body is : ", info[0].id)
    //         if (body) {
    //             response.send(
    //                 data(info)
    //             )
    //         }
    //         else {
    //             response.send({
    //                 "messages": [
    //                     {
    //                         "text": "You are not enroll in any course",
    //                         "quick_replies": [
    //                             {
    //                                 "title": "More",
    //                                 "block_names": ["Principal"]
    //                             },
    //                             {
    //                                 "title": "Go Back",
    //                                 "block names": ["welcome message"]
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             })
    //         }
    //     }
    //     else if (error) {
    //         console.log('error is:', error);
    //         response.send({
    //             messages: {
    //                 "text": "Something went wrong please try again with valid user id and course id"
    //             }
    //         })
    //     }
    // }
    // rq(options, callback);