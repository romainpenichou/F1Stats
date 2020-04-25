
export default class ApiModel {
  constructor(response, contentClass) {

    this.content = contentClass.fromData(response);

    // this.status = response.status;
    // this.errors = response.errors?.map(
    //   error => new Error(error)
    // );
      
    // if(!!response.content) {
    //   console.log(contentClass)
    //   this.content = contentClass.fromData(response.content);
    // }
  }
}