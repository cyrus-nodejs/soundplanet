import { createSlice,  createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TRACK, ARTIST, GENRE, PLAYLIST} from '../../../utils/@types'
import { RootState } from '../../app/store'
import axios from 'axios'


export interface AudioState {
  songs:TRACK[]  ,
  trackIndex:number,
  currentTrack:TRACK | null |  void
  isplaying:boolean
  artists:ARTIST[]
  genres:GENRE[]
  newtracks:TRACK[]
  topten:TRACK[]
  playList:PLAYLIST | null
  playListSong:TRACK[]
  allPlayList:TRACK[]
  searchTerm:string | null
  searchResult : TRACK[] | null
  isShuffle:boolean
  isRepeat:boolean
  status:  'idle' | 'pending' | 'succeeded' | 'failed'
  error:string | null | undefined
  }

  // Define the initial value for the slice state
const initialState: AudioState = {
    songs: [],
    trackIndex:0,
    currentTrack:null,
    isplaying:false,
    artists:[],
    genres:[],
    newtracks:[],
    topten:[],
    playList:null,
    searchTerm:null,
    searchResult:[],
    playListSong:[],
    allPlayList:[],
    isShuffle:false,
    isRepeat:false,
    status: 'idle' ,
    error:null
  }
  

// eslint-disable-next-line react-refresh/only-export-components
const BASEURL = import.meta.env.VITE_APP_BASE_URL


export const fetchAllTracks = createAsyncThunk(
    'audio/fetchAllTracks', async () => {
        const response= await axios.get(`${BASEURL}/songs`,{ withCredentials: true })
        console.log(response.data.songs)
        return response.data.songs
      });

  export const fetchArtists = createAsyncThunk(
    'audio/fetchArtists',  async () => {
        const response= await axios.get(`${BASEURL}/artists`,{ withCredentials: true })
        console.log(response.data.artists)
        return response.data.artists
      });

      export const fetchGenres = createAsyncThunk(
        'audio/fetchGenres',  async () => {
            const response= await axios.get(`${BASEURL}/genres`,{ withCredentials: true })
            console.log(response.data.genres)
            return response.data.genres
          });

          export const fetchTopTen = createAsyncThunk(
            'audio/fetchTopTen',  async () => {
                const response= await axios.get(`${BASEURL}/topten`,{ withCredentials: true })
                console.log(response.data)
                return response.data
              });

              export const fetchNewTrack = createAsyncThunk(
                'audio/fetchNewTrack',  async () => {
                    const response= await axios.get(`${BASEURL}/newsong`,{ withCredentials: true })
                    console.log(response.data)
                    return response.data
                  });
      
               
                 
                  export const fetchCurrentPlaylist = createAsyncThunk(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    'audio/fetchCurrentPlaylist',  async (Id:any) => {
                        const response= await axios.get(`${BASEURL}/playlist/${Id}`,{ withCredentials: true })
                        console.log(response.data.playlist)
                        return response.data.playlist
                      });

                      export const fetchSearchTerm = createAsyncThunk(
                       
                        'audio/fetchSearchTerm',  async (data) => {
                            const response= await axios.post(`${BASEURL}/searchterm`, {data},{ withCredentials: true })
                            console.log(response.data)
                          
                            return response.data
                          });
    
                      export const fetchSearchResult = createAsyncThunk(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        'audio/fetchSearchResult',  async (searchQuery:any) => {
                            const response= await axios.get(`${BASEURL}/search?q=${searchQuery}`,{ withCredentials: true })
                            console.log(response.data)
                            return response.data
                          });
        
                     




// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    handleNext: (state) => {
      if (!state.isShuffle ){
        state.trackIndex = Math.floor(Math.random() * state.songs.length)
       state.currentTrack = state.songs[state.trackIndex]
      }else if (state.trackIndex >= state.songs.length - 1) {
             state.currentTrack = state.songs[state.trackIndex]
           }else if  (state.trackIndex == 0) {
                state.currentTrack = state.songs[state.trackIndex]
               }else{
                state.currentTrack = state.songs[state.trackIndex += 1]
               }
      
    },
    handlePrevious: (state) => {
      if (!state.isShuffle ){
        state.trackIndex = Math.floor(Math.random() * state.songs.length)
       state.currentTrack = state.songs[state.trackIndex]
      }else if (state.trackIndex === 0)   {
        state.currentTrack = state.songs[state.trackIndex]
         
        }else if (state.trackIndex >= state.songs.length - 1) {
          state.currentTrack = state.songs[state.trackIndex]
          // setCurrentTrack(songs[trackIndex + 1]);
        }else{
          state.currentTrack = state.songs[state.trackIndex -= 1]
        }
        // setCurrentTrack(songs[trackIndex + 1]);
      
     
    },
    
    playTrack: (state, action: PayloadAction) => {
     state.currentTrack = action.payload
     state.isplaying = !state.isplaying
    },
    togglePlayPause: (state) => {
      state.isplaying = !state.isplaying
     },

     playAllTracks: (state, action) => {
      state.songs = action.payload
      state.currentTrack = state.songs[state.trackIndex]
      state.isplaying = !state.isplaying
     },

     handleShuffle : (state) => {
      state.isShuffle = !state.isShuffle
     },

     handleRepeat : (state) => {
      state.isRepeat = !state.isRepeat
     },
    
     handleSearchterm : (state, action) => {
      state.searchTerm = action.payload
     }
  },
   extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAllTracks.pending, (state) => {
      state.status = 'pending'
    })
    .addCase(fetchAllTracks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.songs= action.payload
         state.currentTrack=state.songs[state.trackIndex]
        
      })
      .addCase(fetchAllTracks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      .addCase(fetchArtists.pending, (state) => {
      state.status = 'pending'
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.artists= action.payload
      })
      .addCase(fetchArtists.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      
      .addCase(fetchGenres.pending, (state) => {
        state.status = 'pending'
        })
        .addCase(fetchGenres.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.genres= action.payload
        })
        .addCase(fetchGenres.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message;
        })
        .addCase(fetchNewTrack.pending, (state) => {
          state.status = 'pending'
          })
          .addCase(fetchNewTrack.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.newtracks= action.payload
          })
          .addCase(fetchNewTrack.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
          })
          .addCase(fetchTopTen.pending, (state) => {
            state.status = 'pending'
            })
            .addCase(fetchTopTen.fulfilled, (state, action) => {
              state.status = 'succeeded'
              state.topten= action.payload
            })
            .addCase(fetchTopTen.rejected, (state, action) => {
              state.status = 'failed'
              state.error = action.error.message;
            })
            .addCase(fetchCurrentPlaylist.pending, (state) => {
              state.status = 'pending'
              })
              .addCase(fetchCurrentPlaylist.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.playList= action.payload
                state.playListSong=action.payload.item
              })
              .addCase(fetchCurrentPlaylist.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message;
              })
              .addCase(fetchSearchResult.pending, (state) => {
                state.status = 'pending'
                })
                .addCase(fetchSearchResult.fulfilled, (state, action) => {
                  state.status = 'succeeded'
                  state.searchResult= action.payload.searchresults
                
                 
                })
                .addCase(fetchSearchResult.rejected, (state, action) => {
                  state.status = 'failed'
                  state.error = action.error.message;
                })
             
    
  },
})

// Export the generated action creators for use in components
export const getSongs = (state:RootState) => state.audio.songs
export const getArtists = (state:RootState) => state.audio.artists
export const getGenres = (state:RootState) => state.audio.genres
export const getNewTracks = (state:RootState) => state.audio.newtracks
export const getTopTen = (state:RootState) => state.audio.topten
export const getTrackIndex = (state:RootState) => state.audio.trackIndex
export const getCurrentTrack = (state:RootState) => state.audio.currentTrack
export const getIsPlaying = (state:RootState) => state.audio.isplaying
export const getPlayList = (state:RootState) => state.audio.playList
export const getPlayListSong = (state:RootState) => state.audio.playListSong
export const getIsShuffle = (state:RootState) => state.audio.isShuffle
export const getIsRepeat = (state:RootState) => state.audio.isRepeat
export const getAudioError = (state:RootState) => state.audio.error
export const getAudioStatus = (state:RootState) => state.audio.status
export const getSearchResult = (state:RootState) => state.audio.searchResult
export const getSearchTerm = (state:RootState) => state.audio.searchTerm
export const {handleNext, playTrack, togglePlayPause, handlePrevious,
  
  playAllTracks, handleShuffle, handleRepeat, handleSearchterm} = audioSlice.actions


// Export the slice reducer for use in the store configuration
export default audioSlice.reducer;