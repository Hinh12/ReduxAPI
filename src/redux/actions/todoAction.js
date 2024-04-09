import {createAsyncThunk} from '@reduxjs/toolkit';
import {addTodo} from '../reducers/todoReducer';
const api_url = 'http://10.24.59.204:3000/congviec';

export const fetchTodos = () => {
  return async dispatch => {
    try {
      const response = await fetch(api_url);
      const data = await response.json();
      // dữ liệu lấy được từ api về, duyệt mảng và lưu vào store của redux

      console.log(data);

      // //Tham khảo ở screen có hàm xử lý việc thêm
      // const handleAddTodo = ()=>{
      //     let duLieuThem = { id: Math.random().toString(), title: title };
      //     dispatch( addTodo ( duLieuThem )  );
      // }

      data.forEach(row => {
        //    dữ liệu dạng: {
        //     title: "title 1",
        //     status: false,
        //     id: "1"
        //     },
        // console.log(JSON.parse(row));
        // console.log(row.title);

        dispatch(addTodo(row));
      });
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
};

export const deleteTodoApi = createAsyncThunk(
  'todo/deleteTodoApi',
  async (id, thunkAPI) => {
    try {
      // Gửi yêu cầu DELETE đến API để xóa todo
      const response = await fetch(`${api_url}/${id}`, {
        method: 'DELETE',
      });
      // console.log(response);
      // Kiểm tra nếu status code là 200 hoặc 204 thì xóa thành công
      if (response.ok) {
        // console.log(response);
        // Sau khi xóa thành công, trả về id của todo đã xóa để cập nhật store
        return id;
      } else {
        // Nếu có lỗi từ phía server, trả về lỗi
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
    } catch (error) {
      // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addTodoAPI = createAsyncThunk(
  'todo/addTodoAPI',
  async (objTodo, thunkAPI) => {
    console.log(objTodo);
    try {
      // Gửi yêu cầu DELETE đến API để xóa todo
      const response = await fetch(api_url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objTodo),
      });
      const data = await response.json();
      // console.log(response);
      // Kiểm tra nếu status code là 200 hoặc 204 thì xóa thành công
      if (response.ok) {
        // console.log(response);
        // Sau khi xóa thành công, trả về id của todo đã xóa để cập nhật store
        return data;
      } else {
        // Nếu có lỗi từ phía server, trả về lỗi
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
    } catch (error) {
      // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateTodoApi = createAsyncThunk(
  'todo/updateTodoApi',
  async (objUpdate, thunkAPI) => {
    // console.log('objupdate: '+ JSON.stringify(objUpdate));
    try {
      // Gửi yêu cầu DELETE đến API để xóa todo

      const response = await fetch(`${api_url}/${objUpdate.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objUpdate.data),
      });

      const data = await response.json();
      // console.log(response);
      // Kiểm tra nếu status code là 200 hoặc 204 thì xóa thành công
      if (response.ok) {
        // console.log(response);
        // Sau khi xóa thành công, trả về id của todo đã xóa để cập nhật store
        return data;
      } else {
        // Nếu có lỗi từ phía server, trả về lỗi
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
    } catch (error) {
      // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const toggleTodoApi = createAsyncThunk(
  'todo/toggleTodoApi',
  async (objUpdate, thunkAPI) => {
    // console.log('objupdate: '+ JSON.stringify(objUpdate));
    try {
      // Gửi yêu cầu update đến API

      const response = await fetch(`${api_url}/${objUpdate.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objUpdate.data),
      });

      const data = await response.json();
      // console.log(response);
      // Kiểm tra nếu status code là 200 hoặc 204 thì xóa thành công
      if (response.ok) {
        // console.log(response);
        // Sau khi xóa thành công, trả về id của todo đã xóa để cập nhật store
        return data;
      } else {
        // Nếu có lỗi từ phía server, trả về lỗi
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
    } catch (error) {
      // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
