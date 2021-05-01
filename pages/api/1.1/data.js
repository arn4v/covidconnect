import { getTwitterSearchRequestV1 } from "../../../lib/twitter";

export default async (req, res) => {
  try {
    // Make reuqest
    console.log('query: ', req.query);
    const { city, resource_type, max_results } = req.query; 

    const apiResponse = await getTwitterSearchRequestV1({ 
      city: city,
      resource_type: resource_type,
      max_results: max_results || 100
    });

    const response = {
      query_params: req.query,
      twitter_search_params: apiResponse.twitter_params,
      search_query: apiResponse.search_query,
      api_response: apiResponse.res
    };

    // TODO(viksit): add error handling
    res.status(200).json({ response: response, status: 200 });
  } catch(err){
    res.status(500).json({ response: { error: err.message }, status: 500 });
  }
};