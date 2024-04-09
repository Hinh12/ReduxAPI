import {createSlice} from '@reduxjs/toolkit';
import {
  addTodoAPI,
  deleteTodoApi,
  updateTodoApi,
  toggleTodoApi,
} from '../actions/todoAction';

//1. khai báo khởi tạo state
const initialState = {
  listTodo: [], // chứa danh sách công việc
};

//2. thiết lập cho reducer và định nghĩa các action
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // làm việc cục bộ
    addTodo(state, action) {
      state.listTodo.push(action.payload);
    },
  },
  extraReducers: builder => {
    // sau khi gọi api xong mới gọi vào đây
    builder
      .addCase(deleteTodoApi.fulfilled, (state, action) => {
        // Xóa todo
        state.listTodo = state.listTodo.filter(
          row => row.id !== action.payload,
        );
      })
      .addCase(deleteTodoApi.rejected, (state, action) => {
        // Xử lý khi yêu cầu xóa todo bị từ chối hoặc xảy ra lỗi
        console.log('Delete todo rejected:', action.error.message);
      });
    builder.addCase(addTodoAPI.fulfilled, (state, action) => {
      state.listTodo.push(action.payload);
    });

    builder.addCase(updateTodoApi.fulfilled, (state, action) => {
      // lấy tham số truyền vào
      // console.log(action);
      const {id, tensp, gia,soluong,mieuta,anh} = action.payload;
      // tìm bản ghi phù hợp với tham số truyền vào
      const todo = state.listTodo.find(row => row.id === id);
      // update
      if (todo) {
        todo.tensp = tensp; // gán giá trị
        todo.gia = gia; 
        todo.soluong = soluong; 
        todo.mieuta = mieuta; 
        todo.anh = anh; 

      }
    });

    builder.addCase(toggleTodoApi.fulfilled, (state, action) => {
      // lấy tham số truyền vào
      // console.log(action);
      const {id, status} = action.payload;
      // tìm bản ghi phù hợp với tham số truyền vào
      const todo = state.listTodo.find(row => row.id === id);
      // update

      if (todo) {
        todo.status = status; // gán giá trị
      }
    });

    // Xử lý các action rejected hoặc pending nếu cần
  },
});

// export các thành phần để bên screen có thể sử dụng
export const {addTodo} = todoSlice.actions;
export default todoSlice.reducer;
