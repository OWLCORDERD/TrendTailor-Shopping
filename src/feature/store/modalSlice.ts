import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  modalOpen: boolean; // 모달 활성화 여부
}

const initialState: ModalState = {
  modalOpen: false, // 초기값은 모달 비활성화
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.modalOpen = true; // 모달 활성화
    },
    closeModal: (state) => {
      state.modalOpen = false; // 모달 비활성화
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
export const { openModal, closeModal } = actions;
