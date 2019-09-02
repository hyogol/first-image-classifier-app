let net;
const rs = document.getElementById("result");

document.getElementById("upload-image").addEventListener('change', function () {
    console.log('changed!');
    console.log(document.getElementById("upload-image").value);
    var reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById("img").src = e.target.result;
    }

    reader.readAsDataURL(this.files[0]);
    reader.onloadend = predict;
});

async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Sucessfully loaded model');

  predict();
}

async function predict() {
    const imgEl = document.getElementById('img');
    const result = await net.classify(imgEl);
    str = "Prediction Result is : " + result[0].className + "<br>";
    result.forEach(info => {
        str += "<li>" + info.className + " ( " + Math.round(info.probability*100) + "% )<br>";
    });
    
    rs.innerHTML = str;
    console.log(result);
}

app();
