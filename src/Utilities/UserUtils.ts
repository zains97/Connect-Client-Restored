import {useDispatch} from 'react-redux';
import {getUser} from '../Api/userApis';
import {updateMeState} from '../Redux/slices/MeSlice';

export const useUpdateMe = (userId: string) => {
  let dispatch = useDispatch();
  getUser(userId)
    .then(res => {
      console.log('UUMS RES:', res);
      dispatch(updateMeState(res.data));
    })
    .catch(() => {});
};
