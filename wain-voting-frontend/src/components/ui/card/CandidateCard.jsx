import React, { useState } from "react";
import PrimaryButton from "../button/PrimaryButton";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export const CandidateCard = ({ candidate, isValidUserVoting, onVote }) => {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  console.log(isValidUserVoting);
  return (
    <>
      <div className="flex flex-col items-center gap-3 ">
        <img
          src={candidate.image}
          alt={candidate.name}
          className="sm:rounded-full w-50 h-50 "
        />
        <p className="text-xl font-semibold">{candidate.name}</p>
        <PrimaryButton onClick={open}>Chi tiết ứng viên</PrimaryButton>
      </div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none "
        onClose={close}
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4 ">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-secondary-900 text-dark-900 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium ">
                {candidate.name}
              </DialogTitle>
              <hr className="text-secondary-700" />
              <div className="flex flex-col items-center mt-5 gap-2">
                <img
                  src={candidate.image}
                  alt={candidate.name}
                  className="w-50 h-50 rounded-2xl"
                />
                <p className="mt-2 text-sm/6">{candidate.description}</p>
              </div>
              <div className="mt-4 flex gap-3 justify-end">
                <button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white"
                  onClick={close}
                >
                  Trở lại
                </button>
                {isValidUserVoting() && (
                  <button
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white"
                    onClick={async () => {
                      await onVote();
                      close();
                    }}
                  >
                    Bình chọn
                  </button>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
