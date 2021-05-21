import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState, AppDispatch } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const token = (state: RootState) => state.auth.token;
export const isLoggedIn = (state: RootState) => state.auth.isLoggedIn;
