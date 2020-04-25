import config from '../../config';

import ApiModel from './models/apiModel';
import { 
  DriverModel,
} from './models/driver';

const GET = "GET",
    POST = "POST";
    // PUT = "PUT",
    // DELETE = "DELETE";

/**
 * Create a fetch request and return the query Promise
 * @param {string[]} url 
 * @param {*} data 
 * @param {"GET" | "POST" | "PUT" | "DELETE"} method 
 * @returns Promise
 */
function getFetch(url, data, method = GET) {
  /**
   *  Build query url
   */ 
  // inject base url and /api 
  url.unshift("api");
  url.unshift(config.apiGetway);
  // convert to string with "/"
  const urlRequest = url.filter(x => !!x).join("/");

  let options = {}

  if (config.env === 'development')
    options["mode"] = "cors"

  options["headers"] = {}
  options["method"] = method;
  options["headers"]["Accept"] = 'application/json'
  options["headers"]["Content-Type"] = 'application/json'
  
  // add body content if the request has a POST method
  if(options.method == POST && !!data) {
    options["body"] = JSON.stringify(data);
  }

  // create fetch query 
  let request = fetch(urlRequest, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    });

    return request;
}

const Request = {
  /*
  *   Call get db types method
  */
  drivers: {
    getAll: () => {
      const url = ["drivers"]
  
      return getFetch(url).then(
        response => {
          console.log(response);
          return new ApiModel(response, DriverModel)
        }
      )
    }
  }
}

export default Request;