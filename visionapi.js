function processImage() {
        var subscriptionKey = "fa4f01d9196e44328dfdc32ac6c5f584";
        var uriBase =
            "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/ocr"
             
        // Request parameters.
        var params = {
            "language": "unk",
            "detectOrientation": "true",
        };
        // Display the image.
        //var sourceImageUrl = document.getElementById("inputImage").value;
        // document.querySelector("#sourceImage").src = sourceImageUrl;
        // Perform the REST API call.
        $.ajax({
            url: uriBase + "?" + $.param(params),
            // Request headers.
            beforeSend: function(jqXHR){
                jqXHR.setRequestHeader("Content-Type","application/json");
                jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
            type: "POST",
            // Request body.
            data: '{"url": ' + '"' + "https://nodefri.blob.core.windows.net/$web/vin1.png" + '"}',
        })
        .done(function(data) {
           // var obj = JSON.stringify(data,null,2)
            //document.getElementById("demo").innerHTML = obj.name + ", " + obj.age;
            // Show formatted JSON on webpage.
            
            //$("#responseTextArea").val(obj);
            var r = data['regions'];
            for(var i of r) {
                var lines = i['lines'];
                for(var j of lines) {
                    var words = j['words'];
                    for(var k of words){
                        var text = k['text'];
                        if((text.replace(/\s/g,'')).length == 17){

                        $("#responseTextArea").val(text);
                        console.log(text)
                        }
                    }
                }
            }

        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ?
                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" :
                (jQuery.parseJSON(jqXHR.responseText).message) ?
                    jQuery.parseJSON(jqXHR.responseText).message :
                    jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    };
