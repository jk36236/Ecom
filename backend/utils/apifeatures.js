
class ApiFeatures{
  constructor(query,queryStr){
    this.query=query;
    this.queryStr= queryStr;
  }

  //-----------SEARCH
  search(){
    const keyword=this.queryStr.keyword ?  //'this.queryStr' is 'req.query' passed in pdtcntrollr
    {
      //agar keyword mil gya tab, find pdt with that name
     name:{
        $regex:this.queryStr.keyword,
        $options:"i", //i-means case insensitive(A,a-dono find kr ke dega)
     },
    }:{};

    // console.log(keyword);
    this.query=this.query.find({...keyword});//yhan pe hum product.find() ko change kr rhe hain 
    return this; //mtlb yehi class vapis se return kr denge
  }



  // -------------FILTER
  filter(){
    //------for category
    const queryCopy={...this.queryStr};//used spread operator to pass value
    const removeFields=["keyword","page","limit"];
 //removing above fields from querycopy for category filter
    removeFields.forEach((key)=>delete queryCopy[key]);

    //----for price 
 let queryStr= JSON.stringify(queryCopy);//convert int string
 queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=> `$${key}`); //adding $ to it

 this.query= this.query.find(JSON.parse(queryStr)); //again convert to object
return this;
  }


  //-------------PAGINATION
  pagination(resultPerPage){
    const currentPage= Number(this.queryStr.page) || 1; 
    const skip= resultPerPage*(currentPage-1);//no. of pdts to skip
    this.query=this.query.limit(resultPerPage).skip(skip);
    return this;
  }

}

module.exports=ApiFeatures;