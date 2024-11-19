import { ReactNode } from "react";


export interface IMAGE {
    publicId:string;
     url:string;
  }

  export interface AVATAR {
    publicId:string;
     url:string;
  }


  export interface SONGFILE {
    publicId:string;
     url:string | null;
  }

 export interface StringArray {
    [index: number]: string | undefined;
  }




  export interface PRICE {
    price:string;
    plan:string;
    duration:string;
    active:boolean

  }
 

  export interface SUB {
    daysremaining: ReactNode;
    owner:string;
    bill:number;
    paymentid:string;
    active:string;
     package:string
     duration:number;

  }



  export interface ORDER {
    owner:string;
    bill:number;
    paymentid:string;
    payment:boolean;
    package:string
    orderid:string
  }
  




  export interface TRACK  {
    length: ReactNode;
    artistname:string;
    genre:string;
    image:IMAGE
    songfile:SONGFILE;
    status:string;
    album:string,
    title:string;
    topten:string;
    year:string;
    duration:string;
    __v:number
    _id:string
    
  }


  export interface ARTIST {
     artistname:string;
     avatarbg:AVATAR;
     biography:string;
     __v:number

  }

  export interface GENRE {
    title:string;
    genrebg:AVATAR;
    item:TRACK;
 }

 
 export interface PLAYLIST {
  length: ReactNode
  _id: string;
  owner:string;
  title:string;
  item:TRACK;
}

export type audioDisplayType = {
    onLoadedMetadata:() => void;
}

export interface USER {
    _id: string,
    email: string,
    username: string,
    firstname: string,
    lastname: string,
    register_date: string
    __v: number
  }
  
  

  
export type authType = {
    Logout:() => void;
    isAuthenticated:boolean;
    updateUser:USER|null ;
    setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>;

  };

  export type playlistType = {
    createPlaylist:() => void
    Playlist:PLAYLIST[]
    deleteFromPlaylist:(arg0: TRACK, arg1:PLAYLIST ) => void
    addToplaylist:(arg0: TRACK, arg1:PLAYLIST) => void
    clearPlaylist:(arg0: PLAYLIST) => void
    addPlayed:(arg0: TRACK) => void
    deletePlaylist:( arg1:PLAYLIST ) => void
  };

  
  
export type checkoutType = {
  
    createPayment:(arg0: PRICE) => void
    stripePromise:string,
    clientSecret:string,
    currentOrder:ORDER | null
    currentSub:SUB | null


  };



export type audioControlType = {
     timeProgress:number,
     audioRef:React.LegacyRef<HTMLAudioElement>
     progressBarRef:React.LegacyRef<HTMLInputElement>;
setDuration:React.Dispatch<React.SetStateAction<number>>
 volume:number;
 mutevolume:boolean;
setTimeProgress:React.Dispatch<React.SetStateAction<number>>
duration:number;
setVolume:React.Dispatch<React.SetStateAction<number>>;
setMuteVolume:React.Dispatch<React.SetStateAction<boolean>>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
cookies:any;
}