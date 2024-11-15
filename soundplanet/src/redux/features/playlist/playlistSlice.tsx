import { createSlice,  createAsyncThunk , PayloadAction } from '@reduxjs/toolkit'
import {  PLAYLIST, TRACK} from '../../../utils/@types'
import { RootState } from '../../app/store'
import axios from 'axios'


export interface PlaylistState {
playlist:PLAYLIST[] | void | undefined | null

recentlyplayed:TRACK[]|null
status:  'idle' | 'pending' | 'succeeded' | 'failed',
error:string | null | undefined,
message:string|null
  }

  // Define the initial value for the slice state
const initialState: PlaylistState = {
  playlist:null,
  recentlyplayed:null,
    status: 'idle' ,
    error:null,
    message:null
  }
  
  
// eslint-disable-next-line react-refresh/only-export-components
const BASEURL = import.meta.env.VITE_APP_BASE_URL

export const fetchCreatePlaylist = createAsyncThunk(
    'playlist/fetchCreatePlaylist', async (data:{title:string}) => {
      const title= data.title
        const response= await axios.post(`${BASEURL}/createplaylist`, {title}, { withCredentials: true })
        console.log(response.data)
        return response.data
      });

  export const fetchPlaylist = createAsyncThunk(
    'playlist/fetchPlaylist',  async () => {
        const response= await axios.get(`${BASEURL}/playlist`,{ withCredentials: true })
        console.log(response.data)
        return response.data.playlist
      });

      export const fetchAddToPlaylist = createAsyncThunk(
        
        'playlist/fetchAddToPlaylist',  async (data:{track:TRACK, list:PLAYLIST}) => {
            const {track, list} = data
            const itemId = track._id
            const playlistId = list._id
            const response= await axios.post(`${BASEURL}/addtoplaylist`, {itemId, playlistId}, { withCredentials: true })
            console.log(response.data)
            return response.data
          });

 

export const fetchDeleteFromPlayist = createAsyncThunk(

    'playlist/fetchDeleteFromPlayist', async (data:{track:TRACK, playList:PLAYLIST}) => {
        const {track, playList} = data
        const itemId = track._id
        const playlistId = playList._id
        const response= await axios.post(`${BASEURL}/deletefromplaylist`, {itemId, playlistId}, { withCredentials: true })
        console.log(response.data)
        return response.data
      });

  export const fetchClearPlaylist = createAsyncThunk(
    'playlist/fetchClearPlaylist',  async (file:PLAYLIST) => {
        const playlistId = file._id
        const response= await axios.post(`${BASEURL}/clearplaylist`,{playlistId},{ withCredentials: true })
        console.log(response.data)
        return response.data
      });

      export const fetchDeletePlaylist = createAsyncThunk(
        'playlist/fetchDeletePlaylist',  async (playlist:PLAYLIST) => {
            const playlistId = playlist._id
            const response= await axios.post(`${BASEURL}/deleteplaylist`, {playlistId},{ withCredentials: true })
            console.log(response.data.playlist)
            return response.data.playlist
          });

          export const fetchRecentlyPlayed = createAsyncThunk(
            'playlist/fetchRecentlyPlayed ',  async () => {
                const response= await axios.get(`${BASEURL}/getplayed`,{ withCredentials: true })
                console.log(response.data.song.item)
                return response.data.song.item
              });

              export const fetchAddRecentlyPlayed = createAsyncThunk(
                'playlist/fetchAddRecentlyPlayed',  async (file:TRACK) => {
                    const itemId = file._id
                    const response= await axios.post(`${BASEURL}/addplayed`,{itemId},{ withCredentials: true })
                    console.log(response.data)
                    return response.data
                  });
                  export const fetchUpdateTitle = createAsyncThunk(
                    'playlist/fetchUpdateTitle',  async (data:{title:string, track:PLAYLIST}) => {
                        const {title, track} = data
                        const playlistId = track._id
                        const response= await axios.post(`${BASEURL}/updatetitle`,{title, playlistId},{ withCredentials: true })
                        console.log(response.data)
                        return response.data
                      });
    


// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    handleOnInput: (state) => {
     state.message = null
    },
  },
   extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCreatePlaylist.pending, (state) => {
      state.status = 'pending'
    })
    .addCase(fetchCreatePlaylist.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.message = action.payload.message

        
     
      })
      .addCase(fetchCreatePlaylist.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      .addCase(fetchPlaylist.pending, (state) => {
      state.status = 'pending'
      })
      .addCase(fetchPlaylist.fulfilled, (state, action:PayloadAction) => {
        state.status = 'succeeded'
        state.playlist= action.payload
        
      })
      .addCase(fetchPlaylist.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      
      .addCase(fetchAddToPlaylist.pending, (state) => {
        state.status = 'pending'
        })
        .addCase(fetchAddToPlaylist.fulfilled, (state) => {
          state.status = 'succeeded'
        
        })
        .addCase(fetchAddToPlaylist.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message;
        })
        .addCase(fetchAddRecentlyPlayed.pending, (state) => {
            state.status = 'pending'
            })
            .addCase(fetchAddRecentlyPlayed.fulfilled, (state) => {
              state.status = 'succeeded'
              
            })
            .addCase(fetchAddRecentlyPlayed.rejected, (state, action) => {
              state.status = 'failed'
              state.error = action.error.message;
            })
            .addCase(fetchDeleteFromPlayist.pending, (state) => {
                state.status = 'pending'
              })
              .addCase(fetchDeleteFromPlayist.fulfilled, (state) => {
                  state.status = 'succeeded'
                  
                })
                .addCase(fetchDeleteFromPlayist.rejected, (state) => {
                  state.status = 'failed'
                  
                })
                .addCase(fetchClearPlaylist.pending, (state) => {
                state.status = 'pending'
                })
                .addCase(fetchClearPlaylist.fulfilled, (state) => {
                  state.status = 'succeeded'
                 
                })
                .addCase(fetchClearPlaylist.rejected, (state, action) => {
                  state.status = 'failed'
                  state.error = action.error.message;
                })
                
                .addCase(fetchDeletePlaylist.pending, (state) => {
                  state.status = 'pending'
                  })
                  .addCase(fetchDeletePlaylist.fulfilled, (state) => {
                    state.status = 'succeeded'
              
                    
                  })
                  .addCase(fetchDeletePlaylist.rejected, (state, action) => {
                    state.status = 'failed'
                    state.error = action.error.message;
                  })
                  .addCase(fetchRecentlyPlayed.pending, (state) => {
                      state.status = 'pending'
                      })
                      .addCase(fetchRecentlyPlayed.fulfilled, (state, action) => {
                        state.status = 'succeeded'
                        state.recentlyplayed = action.payload
                      })
                      .addCase(fetchRecentlyPlayed.rejected, (state, action) => {
                        state.status = 'failed'
                        state.error = action.error.message;
                      })
                      .addCase(fetchUpdateTitle.pending, (state) => {
                        state.status = 'pending'
                        })
                        .addCase(fetchUpdateTitle.fulfilled, (state) => {
                          state.status = 'succeeded'
                          
                        })
                        .addCase(fetchUpdateTitle.rejected, (state, action) => {
                          state.status = 'failed'
                          state.error = action.error.message;
                        })
            

    
  },
})

// Export the generated action creators for use in components

export const getPlaylist= (state:RootState) => state.playlist.playlist
export const getRecentlyPlayed= (state:RootState) => state.playlist.recentlyplayed
export const getPlaylistError = (state:RootState) => state.playlist.error
export const getPlaylistStatus = (state:RootState) => state.playlist.status
export const getMessage = (state:RootState) => state.playlist.message

export const {handleOnInput} = playlistSlice.actions





// Export the slice reducer for use in the store configuration
export default playlistSlice.reducer;