/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// date picker
import { NgbModule,NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { isNumber, toInteger, padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
//custom date format
import { NgbDateCustomParserFormatter} from "../customdateformat";

import { NgClass,DatePipe } from '@angular/common';
import { RoomTypeService } from "./roomtypes.service";
import { SessionStorageService } from "ngx-webstorage";
import $ from 'jquery';
import { UiSwitchModule } from 'ngx-toggle-switch';
declare var jquery:any;
declare var $ :any;

const now = new Date();

@Component({
 selector: 'app-roomtypes',
 templateUrl: './roomtypes.component.html',
 styleUrls: ['./roomtypes.component.css'],
 providers: [RoomTypeService,NgbDateCustomParserFormatter]
})
/* tslint:disable */
export class RoomtypesComponent implements OnInit {


 constructor(private roomTypeService: RoomTypeService,public session: SessionStorageService
 ,private datePipe: DatePipe ,
 private dateFormate:NgbDateCustomParserFormatter) { }

 public rangefrom:any = new Date().toJSON().split('T')[0];
 public from1:any = new Date().toJSON().split('T')[0];


 getroomTypedetails=[];
 NgbDateStruct = {day: now.getDate() , month:now.getMonth() + 1, year: now.getFullYear()};
 fromdate: NgbDateStruct = {day: now.getDate() , month:now.getMonth() + 1, year: now.getFullYear()};
 fromMinDate: NgbDateStruct = {day: now.getDate() , month:now.getMonth() + 1, year: now.getFullYear()};
//  rangefrom: NgbDateStruct = { day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() };
 rangefromMin: NgbDateStruct = {day: now.getDate() , month:now.getMonth() + 1, year: now.getFullYear()};
 restricefrom: NgbDateStruct = {day: now.getDate() , month:now.getMonth() + 1, year: now.getFullYear()};
 restricefromMin: NgbDateStruct = {day: now.getDate() , month:now.getMonth() + 1, year: now.getFullYear()};
 setper = true;
 selectrestr = [];
 public rateplan=[];
 public roomtypes=[];
 public gridval=[];
 public minimumprice=[];
 enrate:boolean=true;
 disvar:boolean=true;

 mini = false;
 max = false;
 openarrival = false;
 opendeparture = false;
 closearrival = false;
 closedeparture = false;
 houseclose = false;
 public permittedValues=[];
 
 enablinputs(){
this.disvar=false
 }
 doubleclick(event:any){
 alert("iw work fine")
 console.log("dadsddsgfsvancjhfkdgkj")
 // let value = event.target.value;
 // console.log("value", value);
 console.log(event)
 if(event=='1'){
 event='0'
 console.log(event)
 alert(event)
 }

 }

 showhiderestriction(param){
 if(param == "Minimum Stay"){
 this.mini = false;
 }else{
 this.mini = true;
 }
 if(param == "Maximum Stay"){
 this.max = true;
 }
 else{
 this.max = false;
 }
 if(param == "Open For Arrival"){
 this.openarrival = true;
 }
 else{
 this.openarrival = false;
 }
 if(param == "Open For Departure"){
 this.opendeparture = true;
 }
 else{
 this.opendeparture = false;
 }
 if(param == "Close For Arrival"){
 this.closearrival = true;
 }
 else{
 this.closearrival = false;
 }
 if(param == "Close For Departure"){
 this.closedeparture = true;
 }
 else{
 this.closedeparture = false;
 }
 if(param == "House Close"){
 this.houseclose = true;
 }
 else{
 this.houseclose = false;
 }
 }

 RateandAvailability = [
 {
 "month":"jan",
 "day":"mon",
 "date":"1",
 "room_status":"no",
 "room_to_sell":"5",
 "standard_rate":"yes",
 "NR_rate_with_breakfast":"no",
 "Summer_special":"no",
 },
 {
 "month":"Jan",
 "day":"tue",
 "date":"2",
 "room_status":"yes",
 "room_to_sell":"5",
 "standard_rate":"yes",
 "NR_rate_with_breakfast":"no",
 "Summer_special":"no",
 },
 {
 "month":"jan",
 "day":"wed",
 "date":"3",
 "room_status":"yes",
 "room_to_sell":"10",
 "standard_rate":"yes",
 "NR_rate_with_breakfast":"no",
 "Summer_special":"no",
 },
 {
 "month":"jan",
 "day":"thu",
 "date":"4",
 "room_status":"yes",
 "room_to_sell":"10",
 "standard_rate":"yes",
 "NR_rate_with_breakfast":"no",
 "Summer_special":"no",
 },
 {
 "month":"jan",
 "day":"fri",
 "date":"5",
 "room_status":"yes",
 "room_to_sell":"10",
 "standard_rate":"yes",
 "NR_rate_with_breakfast":"no",
 "Summer_special":"no",
 },
 {
 "month":"jan",
 "day":"sat",
 "date":"6",
 "room_status":"yes",
 "room_to_sell":"8",
 "standard_rate":"yes",
 "NR_rate_with_breakfast":"no",
 "Summer_special":"no",
 },
 {
 "month":"jan",
 "day":"sun",
 "date":"7",
 "room_status":"yes",
 "room_to_sell":"5",
 "standard_rate":"yes",
 "NR_rate_with_breakfast":"no",
 "Summer_special":"no",
 }
 ]
 onChangeObj(event,user, bs_id){
 console.log(event,user.room_id,bs_id,this.rangefrom)
 this.enrate = false
 let body = { 
 "business_id": this.bs_id,
 "room_id":user.room_id,
 "start_date": this.rangefrom,
 "end_date":this.todate2
 };
 console.log("rommmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",body)
 this.roomTypeService.selectrateplan(body)
 .subscribe((resp: any) => {
 this.rateplan = resp.Result;
 this.minimumprice=resp.minimumprice;
 // this.todate4=this.selectrestr.house_close;
 console.log("Rate plannnnnnnnnnnnnnnn",this.rateplan)
 console.log("minimumsfs",this.minimumprice)
 });
 }
public room_type:any
public room_name:any
public one="roomtype1"
public volume=[]
public arr:any=[]
 
public roomtype;

 public volume1=[];
 public volume2=[];
 public volume3=[];
 public rm1:any
 public rm2:any
 public rm3:any
 public planar=[];
 public volar=[];
 public rmplan=[];
 public rm_sell1=[];
 public rm_sell2=[];
 public rm_sell3=[];
 public origin=[];
 public gridget=[];
 public rmpplanname1=[];
 public rmpplanname2=[];
 public rmpplanname3=[];
 public pl1=[];
 public pl2=[];
 public pl3=[];
 public pl4=[];
 public pll1=[];
 public pll2=[];
 public pll3=[];
 public pll4=[];
 public frstrmname=[];
 public secondrmname=[];
 public thirdrmname;
 public bs_id;
 public rm_to_sell_date1=[];
public rm_to_sell_date2=[];
public rm_to_sell_date3=[];
public newpll1=[];
public newpll2=[];
public newpll3=[];
public newpll4=[];

 ngOnInit() {
    this.bs_id = this.session.retrieve("business_id")
    this.roomTypeService.getgriddef()
    .subscribe((resp: any) => {
      this.gridget = resp.Result;
      // console.log("room plannnnnnnnnnnnnnnn",this.gridget)
   
    // console.log("length",this.gridget.length)
    
    this.volume1=this.gridget[0].room_type1;
    // console.log("volume1",this.volume1) 
    this.frstrmname=this.gridget[0].room_name;
    this.secondrmname=this.gridget[1].room_name;
    this.thirdrmname=this.gridget[2].room_name

    this.volume2=this.gridget[1].room_type2;
    // console.log("volume2",this.volume2)
   
    this.volume3=this.gridget[2].room_type3;
    // console.log("volume3",this.volume3)
    
    this.volar.push(this.volume1,this.volume2,this.volume3)
    // console.log("volarrrrrrrrrr",this.volar)
    this.rm_sell1=this.gridget[0].room_type1.room_to_sell
    this.rm_sell2=this.gridget[1].room_type2.room_to_sell
    this.rm_sell3=this.gridget[2].room_type3.room_to_sell
    this.rm1=this.gridget[0].room_type1.plans
    this.rm2=this.gridget[1].room_type2.plans
    this.rm3=this.gridget[2].room_type3.plans
    this.planar.push(this.rm1,this.rm2,this.rm3)
    // console.log("roomplan1",this.rm1)
    // console.log("arrayyyyyyyyyyyy",this.planar)
    console.log("rm_sell3",this.rm_sell3)


    for(var i in this.rm_sell1){
      this.rm_to_sell_date1.push(this.rm_sell1[i]['room_date'])
    }
    // console.log("room to sell date ",this.rm_to_sell_date1)

    for(var i in this.rm_sell2){
      this.rm_to_sell_date2.push(this.rm_sell2[i]['room_date'])
    }
    // console.log("room to sell date ",this.rm_to_sell_date2)

   
    
   

    // this.origin = this.rm1.filter(
    //   org => org.room_date === this.rm_sell["room_date"]
    // );

//---------------------------------------------------------------------------------------------------//
   //   for (var i in this.rm1){
        //       this.pl1[i]=this.rm1[i].room_plan1
        //       if(this.pl1[i] == undefined){
               
        //         this.pl1[i]={'room_open':'NA'}
        //       }
        //       else{
        //         this.pl1.push(this.rm1[i].room_plan1)
        //       }
              
        
        // }

    // roomtype1 -->plans -->room_plan1

        for (var i in this.rm1){
          this.pl1.push(this.rm1[i].room_plan1) 
         
        }
    //remove undefined values
        this.pll1 = this.pl1.filter(function( element ) {
          return element !== undefined;
        });
        // console.log("plan1",this.pl1) 
        // console.log("undefined removed array",this.pll1)      
      
// matching room to sell date with plan dates
      for (var k=0;k<this.rm_to_sell_date1.length;k++){
        
        // console.log("sell datee",this.rm_to_sell_date1[k])
       
        try{
          if (this.pll1.find(x => x.room_date == this.rm_to_sell_date1[k]).room_date!=undefined){
            this.newpll1.push(this.pll1[k])
          }
        }
       
        catch(e){
          // console.log(e)
          this.newpll1[k]={'room_open':"NA"}
        }
       
     }
      //  console.log("new final array",this.newpll1)
    
// roomtype1 -->plans -->room_plan2
        for (var i in this.rm1){
          this.pl2.push(this.rm1[i].room_plan2)    
      }
        //remove undefined values
        this.pll2 = this.pl2.filter(function( element ) {
          return element !== undefined;
        });
        // console.log("plan2",this.pl2)

// matching room to sell date with plan dates
      for (var k=0;k<this.rm_to_sell_date1.length;k++){
        
        // console.log("sell datee",this.rm_to_sell_date1[k])
       
        try{
          if (this.pll2.find(x => x.room_date == this.rm_to_sell_date1[k]).room_date!=undefined){
            this.newpll2.push(this.pll2[k])
          }
        }
       
        catch(e){
          console.log(e)
          this.newpll2[k]={'room_open':"NA"}
        }
       
     }
    //  console.log("new final array",this.newpll2)

 // roomtype2 -->plans -->room_plan1   
        for (var i in this.rm2){
          this.pl3.push(this.rm2[i].room_plan1)     
        }
        //remove undefined values
        this.pll3 = this.pl3.filter(function( element ) {
        return element !== undefined;
        });
        // console.log("plan3",this.pll3)

  // matching room to sell date with plan dates
      for (var k=0;k<this.rm_to_sell_date2.length;k++){
        
        // console.log("sell datee",this.rm_to_sell_date2[k])
       
        try{
          if (this.pll3.find(x => x.room_date == this.rm_to_sell_date2[k]).room_date!=undefined){
            this.newpll3.push(this.pll3[k])
          }
        }
       
        catch(e){
          console.log(e)
          this.newpll3[k]={'room_open':"NA"}
        }
       
     }
    //  console.log("new final array",this.newpll3)

    for(var i in this.rm_sell3){
      this.rm_to_sell_date3.push(this.rm_sell3[i]['room_date'])
    }
    console.log("room to sell date33333 ",this.rm_to_sell_date3)

// roomtype3 -->plans -->room_plan1   
        for (var i in this.rm3){
          this.pl4.push(this.rm3[i].room_plan1)     
        }
        //remove undefined values
        this.pll4 = this.pl4.filter(function( element ) {
        return element !== undefined;
        });
        // console.log("plan4",this.pll4)

  });

  // matching room to sell date with plan dates
  for (var l=0;l<this.rm_to_sell_date3.length;l++){
        
    console.log("sell datee",this.rm_to_sell_date3[l])
   
    try{
      if (this.pll4.find(x => x.room_date == this.rm_to_sell_date3[l]).room_date!=undefined){
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        this.newpll4.push(this.pll4[l])
      }
    }
   
    catch(e){
      console.log(e)
      this.newpll4[l]={'room_open':"NA"}
    }
   
 }
 console.log("new final array4",this.newpll4)

  

   
this.roomTypeService.selectroomtype()
.subscribe((resp: any) => {
  this.roomtypes = resp.Result;
  // this.todate4=this.selectrestr.house_close;
  // console.log("room plannnnnnnnnnnnnnnn",this.roomtypes)
});
   this.roomTypeService.selectrestriction()
.subscribe((resp: any) => {
  this.selectrestr = resp.Result;
  // this.todate4=this.selectrestr.house_close;
  // console.log("select restriction",this.selectrestr)
});
    this.dateFormate.format(this.fromdate);
    this.dateFormate.format(this.fromdate);
this.setper = false
    let roomParms={
      "business_id":this.session.retrieve("business_id")
    }
      this.roomTypeService.roomtypeDetails(roomParms)
        .subscribe((resp: any) => {
          if (resp.ServiceStatus == 'Success') {
           // this.getroomTypedetails=resp.Room_List;


            for(var i=0;i<resp.Room_List.length;i++){
              this.getroomTypedetails.push({
                "business_id":resp.Room_List[i].business_id,
                "facilitie1":resp.Room_List[i].facilitie1,
                "facilitie2":resp.Room_List[i].facilitie2,
                "facilitie3":resp.Room_List[i].facilitie3,
                "id":resp.Room_List[i].id,
                "room_type":resp.Room_List[i].room_type,
                "room_code":resp.Room_List[i].room_code,
                "room_name":resp.Room_List[i].room_name,
                "standard_rate":resp.Room_List[i].standard_rate,
                "standard_rate_currency":resp.Room_List[i].standard_rate_currency,
                "totel_room":resp.Room_List[i].totel_room,
                "editFlag":false,
                "srcfile":resp.Room_List[i].room_type==null ?"assets/images/Standard Room.jpg"  :"assets/images/"+resp.Room_List[i].room_type+".jpg"
              });

       }
          }

        });

  }


// grid tab set period button service



 roomName:String;
 // model define
 public sellroomorbasicrate: number;
 public roomdetailsflg = false;
 public labelforroom: any;
 standardRoom(flag) {
 this.roomdetailsflg = true; 
 this.labelforroom = flag.room_type;
 this.roomName=flag.room_name;
 }
 todate:any;
 retrictto:any;

 // get period count \
// setperiod=[];
// public dataa = [];
// public countdates = [];
// public monthh = [];
// public monthhh = [];
// public dayscountt = [];
// public countdys: number;
// public cnt: number;
// public showlabelname = false;
// getdatedetails=[];
// parms:{};
// todate3:any;
// todate2:any;
// todate1:any;
// todate4:any;
// getperioddays(getdate) {
// this.parms = {
 
// "business_id": this.session.retrieve("business_id"),
// "from_date": this.fromdate.year+'-'+this.fromdate.month+'-'+this.fromdate.day,
// "to_date": this.todate3.year+'-'+this.todate3.month+'-'+this.todate3.day


// }
 
// console.log("getdatedaetails#####################",this.parms)
// this.roomTypeService.getdateDetails(this.parms)
// .subscribe((resp: any) => {
// if (resp.ServiceStatus == 'Success') {
// this.countdates=resp.Result;
// }

// });
 
// this.showlabelname = true;

// }
setperiod=[];
 public dataa = [];
 public countdates = [];
 public monthh = [];
 public monthhh = [];
 public dayscountt = [];
 public countdys: number;
 public cnt: number;
 public showlabelname = false;
 getdatedetails=[];
 parms:{};
 todate3:any;
 todate2:any;
 todate1:any;
 todate4:any;
 planA7:any = {};
 getperioddays(getdate) {
 this.pl1=[];
 this.pl2=[];
 this.pl3=[];
 this.pl4=[];
 this.pll1=[];
 this.pll2=[];
 this.pll3=[];
 this.pll4=[];
this.parms = {
 
 "business_id": this.session.retrieve("business_id"),
 "from_date": this.fromdate.year+'-'+this.fromdate.month+'-'+this.fromdate.day,
 "to_date": this.todate3.year+'-'+this.todate3.month+'-'+this.todate3.day


 }
 
 console.log("getdatedaetails#####################",this.parms)
 this.roomTypeService.getgrid(this.parms)
 .subscribe((resp: any) => {
 if (resp.ServiceStatus == 'Success') {
 this.countdates=resp.Result;
 }


 console.log("room plannnnnnnnnnnnnnnn",this.gridget)
 
 console.log("length",this.countdates.length)
 
 this.volume1=this.countdates[0].room_type1;
 console.log("volume111111111111111111111111111111111111111",this.volume1) 
 this.frstrmname=this.countdates[0].room_name;
 this.secondrmname=this.countdates[1].room_name;
 this.thirdrmname=this.countdates[2].room_name

 this.volume2=this.countdates[1].room_type2;
 console.log("volume22222222222222222222222222222222",this.volume2)
 
 this.volume3=this.countdates[2].room_type3;
 console.log("volume33333333333333333333333333333333",this.volume3)
 
 this.volar.push(this.volume1,this.volume2,this.volume3)
 console.log("volarrrrrrrrrr",this.volar)
 this.rm_sell1=this.countdates[0].room_type1.room_to_sell
 this.rm_sell2=this.countdates[1].room_type2.room_to_sell
 this.rm_sell3=this.countdates[2].room_type3.room_to_sell
 this.rm1=this.countdates[0].room_type1.plans
 this.rm2=this.countdates[1].room_type2.plans
 this.rm3=this.countdates[2].room_type3.plans
 this.planar.push(this.rm1,this.rm2,this.rm3)
 console.log("roomplan1",this.rm1)
 console.log("arrayyyyyyyyyyyy",this.planar)
 console.log("rm_sell",this.rm_sell1)

 // this.origin = this.rm1.filter(
 // org => org.room_date === this.rm_sell["room_date"]
 // );
 
 
// roomtype1 -->plans -->room_plan1
 for (var i in this.rm1){
 this.pl1.push(this.rm1[i].room_plan1)
 // if (this.pl1[i]== undefined){
 // this.pl1.keys[room_open]=0;
 // } 
 }
 //remove undefined values
 this.pll1 = this.pl1.filter(function( element ) {
 return element !== undefined;
 });
 console.log("plan1",this.pl1)

 // roomtype1 -->plans -->room_plan2
 for (var i in this.rm1){
 this.pl2.push(this.rm1[i].room_plan2) 
 }
 //remove undefined values
 this.pll2 = this.pl2.filter(function( element ) {
 return element !== undefined;
 });
 console.log("plan2",this.pl2)

 // roomtype2 -->plans -->room_plan1 
 for (var i in this.rm2){
 this.pl3.push(this.rm2[i].room_plan1) 
 }
 //remove undefined values
 this.pll3 = this.pl3.filter(function( element ) {
 return element !== undefined;
 });
 console.log("plan3",this.pl3)

// roomtype3 -->plans -->room_plan1 
 for (var i in this.rm3){
 this.pl4.push(this.rm3[i].room_plan1) 
 }
 //remove undefined values
 this.pll4 = this.pl4.filter(function( element ) {
 return element !== undefined;
 });
 console.log("plan4",this.pl4)

 });
 
 this.showlabelname = true;

 }



 

 // previous and next button functions
 public prevflag = false;
 public nextflag = true;
 clountnextprev = 0;
 start: number = 0;
 end: number = 14;
 nextColumns() {
 this.clountnextprev++;
 if (this.countdates.length >= this.end) {
 this.start = this.start + 14;
 this.end = this.end + 14;
 if (this.start == 0) {
 this.prevflag = false;
 } else if (this.start > 0) {
 this.prevflag = true;
 }
 } if (this.countdates.length == this.end || this.countdates.length < this.end) {
 this.prevflag = true;
 this.nextflag = false;
 }

 }
 preveviousColumns() {
 this.clountnextprev--;
 if (this.start > 0) {
 this.start = this.start - 14;
 this.end = this.end - 14;
 } if (this.start == 0) {
 this.prevflag = false;
 this.nextflag = true;
 }
 if (this.countdates.length > this.end) {
 this.nextflag = true;
 }
 }


 // call modal popup room to sell start
 public labelundrinfo: any;
 public sellmodalsavebut = false;
 callmodalroomsell() {
 this.labelundrinfo = 'Number of room to sell';
 this.sellmodalsavebut = true;
 this.editsavebut = false;
 this.sellroomorbasicrate = null;
 }

 savesellroom() {
 for (var j = 0; j < this.countdates.length; j++) {
 this.countdates[j].Available_Room_Count = this.sellroomorbasicrate;
 }

 }

 // change sell room based on index
 indexval: number;
 editsellroom(event, index, model) {
 this.indexval = 0;
 if (this.start == (14 * this.clountnextprev)) {
 this.indexval = index + (14 * this.clountnextprev);
 this.countdates[this.indexval].Available_Room_Count = model;
 } else {
 this.countdates[index].Available_Room_Count = model;
 }
 }
 // end sell to room functions


 // standard rate
 public hideedit = false;
 standardrate() {
 this.hideedit = true;
 }
 
 // click edit basci button startcallmodalroomsell
 public editsavebut = false;
 clickeditbasicpricebut() {
 this.labelundrinfo = 'New price per night';
 this.sellmodalsavebut = false;
 this.editsavebut = true;
 }

 // edit basic price based on index
 toggleon = true;
 indexvalprice: number;
 editbasciprice(event, index, model) {
 this.indexvalprice = 0;
 
 if (this.start == (14 * this.clountnextprev)) {
 this.indexvalprice = index + (14 * this.clountnextprev);
 this.countdates[this.indexvalprice].Price = model;
 this.countdates[this.indexvalprice].Room_Status = 'Declared';
 // this.toggleon=true;
 } else {
 this.countdates[index].Price = model;
 this.countdates[index].Room_Status = 'Declared';
 // this.toggleon=false;
 }
 }
 tooglebutton(index){
 if (this.countdates[index].Room_Status == 'Declared')
 {
 
 }
 }

 saveeditbasicprice() {
 for (var j = 0; j < this.countdates.length; j++) {
 this.countdates[j].Price = this.sellroomorbasicrate;
 this.countdates[j].Room_Status = 'Declared';
 }
 }

 // end edit basic price this.sellroomorbasicrate=null;

 // click back button
 cleartemp() {
 this.sellroomorbasicrate = null;
 this.countdates = [];
 this.showlabelname = false;
 this.fromdate=null;
 this.todate=null;
 }

// selectedindex;
// selecteditem
// editfun(index,model){
// this.selectedindex=index;
// this.selecteditem=model.room_open;
// console.log(this.selecteditem)
// if(this.selecteditem=="1"){
// this.selecteditem="0"
// this.pll1[index].room_open ="0"
// }
// else{
// this.selecteditem="1"
// this.pll1[index].room_open="1"
// }

// console.log("valuessssssssssondblclick",model)
// console.log("changessssssssssssss",this.pll1)
// }

public frstflow:any=[];
public secondflow:any=[];
public thirdflow:any=[];
 selectedindex1;
selecteditem1
 editfun1(index1,model1){
 this.selectedindex1=index1;
 this.selecteditem1=model1.room_open;
 console.log(this.selecteditem1)
 if(this.selecteditem1=="1"){
 this.selecteditem1="0"
 this.pll1[index1].room_open ="0"
 
 } 
 else{
 this.selecteditem1 = "1"
 this.pll1[index1].room_open="1"
 }
 this.frstflow.push(model1)
 
 console.log("valuessssssssssondblclick",model1)
 console.log("changessssssssssssssfrstflow",this.frstflow)
 console.log("changessssssssssssss",this.pll1)
 }

 selectedindex2;
 selecteditem2
 editfun2(index2,model2){
 this.selectedindex2=index2;
 this.selecteditem2=model2.room_open;
 console.log(this.selecteditem2)
 if(this.selecteditem2=="1"){
 this.selecteditem2="0"
 this.pll3[index2].room_open ="0"
 }
 else{
 this.selecteditem1="1"
 this.pll3[index2].room_open="1"
 }
 this.frstflow.push(model2)
 console.log("valuessssssssssondblclick",model2)
 console.log("changessssssssssssss",this.pll3)
 }

 selectedindex3;
 selecteditem3
 editfun3(index3,model3){
 this.selectedindex3=index3;
 this.selecteditem3=model3.room_open;
 console.log(this.selecteditem3)
 if(this.selecteditem3=="1"){
 this.selecteditem3="0"
 this.pll4[index3].room_open ="0"
 }
 else{
 this.selecteditem3= "1"
 this.pll4[index3].room_open="1"
 }
 this.frstflow.push(model3)
 console.log("valuessssssssssondblclick",model3)
 console.log("changessssssssssssss",this.pll4)
 }


 // send updated values to db
 sendvalues(){
 
 
 let body_send_values={
 "records":this.frstflow 
 }
 console.log("bodyyyyyyyyy",body_send_values)
 this.roomTypeService.getsavebutton(body_send_values)
 .subscribe((resp: any) => {
 if (resp.Status == 'Success') {
 alert("resp.Status "+resp.ServiceStatus);
 }

 });
 }

 selectedindexx;
 selecteditemm
 sendval(departure:any){
 console.log("DATEEE-----------------",departure);
 for(var i=0;i<departure.lenght;i++){
 if(departure[i].close_arrival == null){
 departure[i].close_arrival = "0"; 
 console.log("arrivallllll",departure[i].close_arrival)
 }
 console.log("DATEEE2222222222---",departure[i].close_arrival);
 
 
 }
 let body_send_values={
 "records":departure 
 }
 console.log("bodyyyyyyyyy",body_send_values)
 this.roomTypeService.getsavebutton(body_send_values)
 .subscribe((resp: any) => {
 if (resp.Status == 'Success') {
 alert("resp.Status "+resp.ServiceStatus);
 }

 });
 }
 // sendval(rate,room_open,min,max,arrival,dept){
 // console.log("helloooooooooooooooooooooooooooooo",rate,room_open,min,max,arrival,dept)
 
 // }
 //save room count and rates

 saveRoomNoandRate(datee){
 console.log("data111111111111111",datee)
 console.log("openvalue*****************",this.open)
 console.log("arrayvalue",this.countdates)
 let parmsroom={
 "business_id":this.session.retrieve("business_id"),
 "room_type":this.labelforroom,
 "rooms":this.countdates
 }

 this.roomTypeService.insertandUpdateRatesellcount(parmsroom)
 .subscribe((resp: any) => {
 if (resp.ServiceStatus == 'Success') {
 alert("resp.ServiceStatus "+resp.ServiceStatus);
 }

 });
 }
 // date range
 public sunday:number;
 public monday:number;
 public tuesday:number;
 public wednesday:number;
 public thursday:number;
 public friday:number;
 public saturday:number;
 public from:any;
 public to:any;
 public price:number;
 public sell:number;
 public extra_price:number;
 public user={};
 roomTypesFieldErrorFlag = false;
 daterangedetails(user) {
    console.log("daterange details", user,this.rangefrom)
    console.log("userrrrr",user.roomtosell)
    this.from = this.rangefrom
    this.to = this.todate2
    // if (getdate != null && todate != null && user.roomtosell != null && user.rangeprice != null && user.extra_adult_rate != null) {
    if (this.from !=null && this.to !=null && user.room_id !=null && user.rate_plan_id !=null && user.roomtosell != null && user.rangeprice != null && user.extra_adult_rate != null && (user.sund != null || user.mon != null || user.tue != null || user.wed != null || user.thur != null || user.fri != null || user.sat != null)) {
        // alert("all values are given");
        this.roomTypesFieldErrorFlag = false;
        // days checkbox input
        this.extra_price = user.extra_adult_rate
        this.price = user.rangeprice;
        this.sell = user.roomtosell;
        if (user.sund == true) {
            this.sunday = 1;
            // console.log("checkif", this.sunday)
        } else {
            this.sunday = 0;
            // console.log("checkelse", this.sunday)
        }
        if (user.mon == true) {
            this.monday = 1;
        }
        else {
            this.monday = 0;
        }
        if (user.tue == true) {
            this.tuesday = 1;
        }
        else {
            this.tuesday = 0;
        }
        if (user.wed == true) {
            this.wednesday = 1;
        }
        else {
            this.wednesday = 0;
        }
        if (user.thur == true) {
            this.thursday = 1;
        }
        else {
            this.thursday = 0;
        }
        if (user.fri == true) {
            this.friday = 1;
        }
        else {
            this.friday = 0;
        }
        if (user.sat == true) {
            this.saturday = 1;
        }
        else {
            this.saturday = 0;
        }


        // console.log("details", this.sunday,this.monday,this.rangefrom.year+'-'+this.rangefrom.month+'-'+this.rangefrom.day,this.todate.year+'-'+this.todate.month+'-'+this.todate.day,)
        console.log("dayscount", this.monday, this.tuesday, this.sunday, this.thursday)

        let params = {

            "business_id": this.session.retrieve("business_id").toString(),
            "st_date": this.from.toString(),
            "ed_date": this.to.toString(),
            "days": {
                "sun": this.sunday,
                "mon": this.monday,
                "tue": this.tuesday,
                "wed": this.wednesday,
                "thu": this.thursday,
                "fri": this.friday,
                "sat": this.saturday
            },
            "available_count": this.sell,
            "room_rate": this.price,
            "extra_adult_rate": this.extra_price,
            "room_id": user.room_id,
            "rate_plan_id": user.rate_plan_id

        }
        console.log("input********************", params)
        this.roomTypeService.daterangecount(params)

            .subscribe((resp: any) => {
                if (resp.ServiceStatus == 'Success') {
                    alert("resp.ServiceStatus " + resp.ServiceStatus);
                    this.user={};
                    this.rangefrom;
                    this.todate2 ={};
                }
            });
    }
    else{
        // alert("All values are mandatory");
        this.roomTypesFieldErrorFlag = true
    }
}
public rate_res = {};
 restrcitdeatils(rate_res) {
    console.log("restrictdetails",rate_res)
    if(rate_res.dropdownvalue !=null){
        this.roomTypesFieldErrorFlag = false
        if(rate_res.dropdownvalue == "Minimum Stay"){
            if(rate_res.min_stay !=null && rate_res.min_date){
                this.roomTypesFieldErrorFlag = false;
                this.restrictionData(rate_res);
            }
            else{
                this.roomTypesFieldErrorFlag = true
            }
        }
        if(rate_res.dropdownvalue == "Maximum Stay"){
            if(rate_res.max_stay !=null && rate_res.max_date){
                this.roomTypesFieldErrorFlag = false;
                this.restrictionData(rate_res);
            }
            else{
                this.roomTypesFieldErrorFlag = true
            }
        }
        if(rate_res.dropdownvalue == "Open For Arrival"){
            if(rate_res.open_arrival_from !=null && rate_res.open_arrival_to){
                this.roomTypesFieldErrorFlag = false;
                this.restrictionData(rate_res);
            }
            else{
                this.roomTypesFieldErrorFlag = true
            }
        }
        if(rate_res.dropdownvalue == "Open For Departure"){
            if(rate_res.open_departure_from !=null && rate_res.open_departure_to){
                this.roomTypesFieldErrorFlag = false;
                this.restrictionData(rate_res);
            }
            else{
                this.roomTypesFieldErrorFlag = true
            }
        }
        if(rate_res.dropdownvalue == "Close For Arrival"){
            if(rate_res.close_arrival_from !=null && rate_res.close_arrival_to){
                this.roomTypesFieldErrorFlag = false;
                this.restrictionData(rate_res);
            }
            else{
                this.roomTypesFieldErrorFlag = true
            }
        }
        if(rate_res.dropdownvalue == "Close For Departure"){
            if(rate_res.close_departure_from !=null && rate_res.close_departure_to){
                this.roomTypesFieldErrorFlag = false;
                this.restrictionData(rate_res);
            }
            else{
                this.roomTypesFieldErrorFlag = true
            }
        }
        if(rate_res.dropdownvalue == "House Close"){
            if(rate_res.house_close !=null ){
                this.roomTypesFieldErrorFlag = false;
                this.restrictionData(rate_res);
            }
            else{
                this.roomTypesFieldErrorFlag = true
            }
        }
    }else{
        this.roomTypesFieldErrorFlag = true
    }
    
}

restrictionData(rate_res){
    let body = {


        // "business_id":this.session.retrieve("business_id").toString(),
        "business_id": this.session.retrieve("business_id"),
        "min_stay": rate_res.min_stay != null ? rate_res.min_stay.toString() : "",
        "max_stay": rate_res.max_stay != null ? rate_res.max_stay.toString() : "",
        "close_arrival": rate_res.close_arrival_from != null ? rate_res.close_arrival_from : "",
        "close_departure": rate_res.close_departure_from != null ? rate_res.close_departure_from : "",
        "house_close": rate_res.house_close != null ? rate_res.house_close : "",
        "min_stay_date": rate_res.min_date != null ? rate_res.min_date : "",
        "max_stay_date": rate_res.max_date != null ? rate_res.max_date : "",
        "close_arrival_to": rate_res.close_arrival_to != null ? rate_res.close_arrival_to : "",
        "close_departure_to": rate_res.close_departure_to != null ? rate_res.close_departure_to : "",
        "open_arrival": rate_res.open_arrival_from != null ? rate_res.open_arrival_from : "",
        "open_departure": rate_res.open_departure_from != null ? rate_res.open_departure_from : "",
        "open_arrival_to": rate_res.open_arrival_to != null ? rate_res.open_arrival_to : "",
        "open_departure_to": rate_res.open_departure_to != null ? rate_res.open_departure_to : ""


    }

    console.log("params details", body)
    this.roomTypeService.restriction(body)

        .subscribe((resp: any) => {
            if (resp.ServiceStatus == 'Success') {
                alert("resp.ServiceStatus " + resp.ServiceStatus);
            }

        });
}
 public toggleValue:any;
public open:any;
public toggdate;
tog:boolean = false;

public togdate;

 
 
 toggleClicked(lt){
 // this.toggle_on = toggleValue
 console.log("all value is",lt)
 console.log("toggelevalue",lt.room_open)
 this.toggleValue = true
 this.togdate = lt.date;
 console.log("get date",this.togdate)
 // console.log('the toggle has been clicked! ' + this.toggleValue);
 if (lt.room_open == true ){
 this.open = 1
 this.tog = false
 // this.toggdate = this.fromdate.year+'-'+this.fromdate.month+'-'+this.fromdate.day,
 console.log("set toggle value",lt.room_open ,this.tog )
 }
 else{
 this.open = 0
 this.tog=true
 console.log("else set toggle value",lt.room_open ,this.tog )
 }
 return this.open
 }
 preventSingleClick = false;
 timer: any;
 
 doubleClick () {
 this.preventSingleClick = true;
 clearTimeout(this.timer);
 alert('Double Click Event')

 }
 refreshroomtype(){
    this.roomTypeService.selectroomtype()
    .subscribe((resp: any) => {
        this.roomtypes = resp.Result;
        // this.todate4=this.selectrestr.house_close;
        console.log("room plannnnnnnnnnnnnnnn", this.roomtypes)
    });
}
}