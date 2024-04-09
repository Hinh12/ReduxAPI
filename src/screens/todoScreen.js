import {useDispatch, useSelector} from 'react-redux';
import {
  Alert,
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';

import {
  fetchTodos,
  deleteTodoApi,
  addTodoAPI,
  updateTodoApi,
  toggleTodoApi,
} from '../redux/actions/todoAction';
//import { Picker } from "@react-native-picker/picker";
//import * as ImagePicker from 'expo-image-picker';

const TodoScreen = () => {
  // Khai báo các state để thực hiện thêm và sửa
  const [tensp, setTensp] = useState('');
  const [gia, setGia] = useState('');
  const [soluong, setSoluong] = useState('');
  const [mieuta, setMieuta] = useState('');
  const [anh, setAnh] = useState('');
  const [editTensp, setEditTensp] = useState('');
  const [editGia, setEditGia] = useState('');
  const [editSoluong, setEditSoluong] = useState('');
  const [editMieuta, setEditMieuta] = useState('');
  const [editAnh, setEditAnh] = useState('');
  const [idEdit, setIdEdit] = useState(null);

  // Khai báo các state để lưu trữ giá trị ban đầu
  const [initialEditTensp, setInitialEditTensp] = useState('');
  const [initialEditGia, setInitialEditGia] = useState('');
  const [initialEditSoluong, setInitialEditSoluong] = useState('');
  const [initialEditMieuta, setInitialEditMieuta] = useState('');
  const [initialEditAnh, setInitialEditAnh] = useState('');

  // Lấy danh sách dữ liệu từ Redux store
  const listTodo = useSelector(state => state.listTodo.listTodo);
  const dispatch = useDispatch();
  //chọn ảnh
  // const pickImage = async () => {
  //   let kq = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //   console.log(kq);
  //   if (!kq.canceled) {
  //     setEditAnh(kq.assets[0].uri);
  //   }
  // };


  // Lấy danh sách todos khi màn hình được tạo
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // Hàm xử lý khi người dùng nhấn nút Edit
  const handleEdit = (id, tensp, gia, soluong, mieuta, anh) => {
    setEditTensp(tensp);
    setEditGia(gia);
    setEditSoluong(soluong);
    setEditMieuta(mieuta);
    setEditAnh(anh);
    setIdEdit(id);

    // Lưu trữ giá trị ban đầu
    setInitialEditTensp(tensp);
    setInitialEditGia(gia);
    setInitialEditSoluong(soluong);
    setInitialEditMieuta(mieuta);
    setInitialEditAnh(anh);
  };

  // Trong hàm handleCancel, đặt lại giá trị của dữ liệu sửa đổi về giá trị ban đầu
  const handleCancel = () => {
    setEditTensp(initialEditTensp);
    setEditGia(initialEditGia);
    setEditSoluong(initialEditSoluong);
    setEditMieuta(initialEditMieuta);
    setEditAnh(initialEditAnh);
  };

  // Hàm xử lý cập nhật todo
  const handleUpdate = () => {
    let duLieuUpdate = {
      tensp: editTensp,
      gia: editGia,
      soluong: editSoluong,
      mieuta: editMieuta,
      anh: editAnh,
    };
    dispatch(updateTodoApi({id: idEdit, data: duLieuUpdate}))
      .then(result => {
        console.log('Todo update successfully!');
        setEditTensp('');
        setEditGia('');
        setEditSoluong('');
        setEditMieuta('');
        setEditAnh('');
        setIdEdit(null);

        // Reset các giá trị của dữ liệu sửa đổi về giá trị ban đầu
        setEditTensp(initialEditTensp);
        setEditGia(initialEditGia);
        setEditSoluong(initialEditSoluong);
        setEditMieuta(initialEditMieuta);
        setEditAnh(initialEditAnh);
      })
      .catch(error => {
        console.error('Error update todo:', error);
      });
  };

  // Hàm xử lý việc thêm todo
  const handleAddTodo = () => {
    let duLieuThem = {
      tensp: tensp,
      gia: gia,
      soluong: soluong,
      mieuta: mieuta,
      anh: anh,
    };
    dispatch(addTodoAPI(duLieuThem))
      .then(result => {
        console.log('Todo add successfully!');
        setTensp('');
        setGia('');
        setSoluong('');
        setMieuta('');
        setAnh('');
      })
      .catch(error => {
        console.error('Error add todo:', error);
      });
  };

  // Hàm xử lý việc xóa todo
  const handleDeleteTodo = async id => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa mục này?',
      [
        {
          text: 'Không',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => {
            dispatch(deleteTodoApi(id))
              .then(result => {
                console.log('Todo deleted successfully!');
              })
              .catch(error => {
                console.error('Error deleting todo:', error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Render màn hình Todo
  return (
    <View>
      <ScrollView>
        {/* Form thêm todo */}
        <View>
          <TextInput
            placeholder="Nhập tên sản phẩm"
            value={tensp}
            onChangeText={setTensp}
          />
          <TextInput placeholder="Nhập giá" value={gia} onChangeText={setGia} />
          <TextInput
            placeholder="Nhập số lượng"
            value={soluong}
            onChangeText={setSoluong}
          />
          <TextInput
            placeholder="Nhập miêu tả"
            value={mieuta}
            onChangeText={setMieuta}
          />
          <TextInput
            placeholder="Nhập link ảnh"
            value={anh}
            onChangeText={setAnh}
          />
          {/* chon anh */}
          {/* <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "green",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    borderRadius: 10,
                    top: 30,
                    width: "40%",
                  }}
                  onPress={pickImage}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 13,
                    }}
                  >
                    Chọn ảnh
                  </Text>
                </TouchableOpacity>
                <Image
                  source={{ uri: anh }}
                  style={{
                    height: 100,
                    width: 100,
                    backgroundColor: "red",
                    resizeMode: "stretch",
                  }}
                />
              </View> */}
          <Button title="Thêm việc" onPress={handleAddTodo} />
        </View>

        {/* Danh sách todo */}
        {listTodo.map(row => (
          <View
            key={row.id}
            style={{
              margin: 10,
              padding: 10,
              borderColor: 'blue',
              borderWidth: 1,
            }}>
            {idEdit === row.id ? (
              // Form sửa todo
              <>
                <TextInput value={editTensp} onChangeText={setEditTensp} />
                <TextInput value={editGia} onChangeText={setEditGia} />
                <TextInput value={editSoluong} onChangeText={setEditSoluong} />
                <TextInput value={editMieuta} onChangeText={setEditMieuta} />
                <TextInput value={editAnh} onChangeText={setEditAnh} />
                <Button title="Đóng" onPress={handleCancel} />
                <Button title="Update" onPress={handleUpdate} />
              </>
            ) : (
              // Hiển thị thông tin todo
              <>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{padding: 10}}>
                    <Text
                      style={{
                        width: '100%',
                        backgroundColor: 'gray',
                        color: 'white',
                        padding: 5,
                      }}>
                      Tên sản phẩm: {row.tensp}
                    </Text>
                    <Text
                      style={{
                        width: '100%',
                        backgroundColor: 'gray',
                        color: 'white',
                        padding: 5,
                      }}>
                      Giá: {row.gia}
                    </Text>
                    <Text
                      style={{
                        width: '100%',
                        backgroundColor: 'gray',
                        color: 'white',
                        padding: 5,
                      }}>
                      Số lượng: {row.soluong}
                    </Text>
                    <Text
                      style={{
                        width: '100%',
                        backgroundColor: 'gray',
                        color: 'white',
                        padding: 5,
                      }}>
                      Miêu tả: {row.mieuta}
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={{uri: row.anh}}
                      style={{width: 150, height: 150, backgroundColor: 'red'}}
                    />
                  </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                  <TouchableOpacity style={{backgroundColor:'black',width:80,height:40,justifyContent:'center',alignItems:'center',borderRadius:5}} onPress={() => handleDeleteTodo(row.id)}>
                    <Text style={{color: 'white'}}>Xóa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{backgroundColor:'black',width:80,height:40,justifyContent:'center',alignItems:'center',borderRadius:5}}
                    onPress={() =>
                      handleEdit(
                        row.id,
                        row.tensp,
                        row.gia,
                        row.soluong,
                        row.mieuta,
                        row.anh,
                      )
                    }>
                    <Text style={{color: 'white'}}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TodoScreen;
