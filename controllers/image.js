const returnClarifaiRequestOption = (imageUrl) => {
  const PAT = '03adb75e76bd4b53bcd987c6c0d7511d';
  const USER_ID = 'radustana15';       
  const APP_ID = 'my-first-application-y54axn';
  const IMAGE_URL = imageUrl;
  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
  });
  const requestOption = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };
  return requestOption;
}

const handleApiCall = (req,res) => {
	fetch(`https://api.clarifai.com/v2/models/face-detection/outputs`,returnClarifaiRequestOption(req.body.input))
	.then(response => response.json())
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req,res, postgres) =>{
	const { id } = req.body;
	postgres('users').where('id', '=', id)
		.increment('entries',1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0].entries);
		})
		.catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}