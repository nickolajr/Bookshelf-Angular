
export class Book{

  id:number=0;
  title:Title=new Title();
  coverImage:CoverImage=new CoverImage();
  volumes?:number=0;
  status:string="";
  format:string="";
  showdetails:boolean=false;
}
class CoverImage{
  large?:string="";
}
class Title{
  english?:string="";
  romaji?:string="";
  native?:string="";
}