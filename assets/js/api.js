
var API_URL = 'https://9r01aap4ef.execute-api.us-east-1.amazonaws.com/test-stage';

function callSearchGet() {
    console.log("click!")
    return apigClient.searchGet({ q: $('#search-inp').val() }, {
        // return apigClient.searchGet({q:"photos with boat and airplane"}, {
        // messages: [{
        //     type: 'unstructured',
        //     unstructured: {
        //         text: msg
        //     }
        // }]
    }, {});
}

function callUploadBucketItemPut() {
    console.log("click!")

    const selectedFile = document.getElementById('myFile').files[0]

    if (!selectedFile) {
        return
    }
    var filetype = selectedFile.type
    var filename = encodeURIComponent(selectedFile.name.replace("+", " "))
    console.log(filename)
    console.log(filetype)
    var customTag = $("#inp-tag").val().split(",").map(element => {
        return element.trim();
    })
    customTag = $.grep(customTag, function (el, i) {
        if (!el) {
            return false;
        }
        return true;
    });
    customTag = customTag.toString()
    console.log(customTag)


    axios({
        method: 'PUT',
        url: 'https://5008dk4yhh.execute-api.us-east-1.amazonaws.com/test-stage/upload/cchw2photostorage/' + filename,
        data: selectedFile,
        headers: { "Content-Type": filetype, "x-amz-meta-customLabels": customTag, "x-amz-acl": "public-read", "X-Api-Key": "pLJIwiQ62f2rpXBKgDhnB7uc5DOvAW0NrkZwWr5i" }
    })
        .then((response) => {
            console.log("response")
            console.log(response)
        })
        .catch((error) => {
            console.log('an error occurred', error);
        })
}

$(document).ready(function () {
    $("#search").on('click', function () {
        $("#result").empty();
        if ($("#search-inp").val().trim().length == 0) {
            $(("<div></div>"), {
                class: "col-12",
                html: "Please input a tag",
            }).appendTo($("#result"));
            return;
        }
        console.log($("#search-inp").val());
        callSearchGet()
            .then((response) => {
                console.log("response")
                console.log(response)
                console.log(response["data"])
                if (response["data"].length == 0) {
                    $(("<div></div>"), {
                        class: "col-12",
                        html: "Sorry, No Result",
                    }).appendTo($("#result"));
                }
                $.each(response["data"], function (index, value) {
                    $(("<img></img>"), {
                        class: "col-4",
                        src: value,
                        alt: "images",
                    }).appendTo($("#result"));
                })
                $("#search-inp").val("");
            })
            .catch((error) => {
                console.log('an error occurred', error);
            });

    });
    $("#tag-btn").on('click', function () {

        callUploadBucketItemPut()
        $("#inp-tag").val("");
    });
});

