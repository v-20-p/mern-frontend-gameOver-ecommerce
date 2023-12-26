import { PayloadAction, createAsyncThunk, createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import api from '../../../api';
import { toast } from 'react-toastify';

export const fetchChats = createAsyncThunk('chats/fetchChats', async () => {
  try {
    const response = await api.get('/api/chat');
    return response.data.messages;
  } catch (error: any) {
    throw error.response.data.message;
  }
});

export const sendChat = createAsyncThunk('chats/sendChat', async (message: string) => {
  try {
    const response = await api.post('/api/chat', { message });
    return [{sender:'user',content:message,_id:response.data.botMessage._id+'2wwqx'},response.data.botMessage];
  } catch (error: any) {
    throw error.response.data.message;
  }
});

export type message = {

    sender?: string | undefined;
    content?: string | undefined;
    _id?: string;

};

export type ChatsState = {
  chats: message[];
  error: string | undefined;
  isLoading: boolean;
};

const initialState: ChatsState = {
  chats: [],
  error: '',
  isLoading: false,
};

const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.fulfilled, (state, action: PayloadAction<message[]>) => {
        state.chats = action.payload;
        state.isLoading = false;
      })
      .addCase(sendChat.fulfilled, (state, action: PayloadAction<message[]>) => {
        state.chats.push(action.payload[0])
        state.chats.push(action.payload[1])
        state.isLoading = false;
      })
      .addMatcher(
        isPending(sendChat,fetchChats),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
         isRejected(sendChat,fetchChats),
        (state, action) => {
          state.error = action.error.message || 'Error fetching data';
          state.isLoading = false;
          toast.error(state.error, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
        }
      );
  },
});

export default chatSlice.reducer;
