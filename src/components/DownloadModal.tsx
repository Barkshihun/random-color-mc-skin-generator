import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

function DownloadModal({ open, setOpen, skinPngCanvas }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; skinPngCanvas: HTMLCanvasElement }) {
  const DEFAULT_TEXT = "랜덤 색깔 마인크래프트 스킨";
  const [text, setText] = useState("");
  const downloadBtnRef = useRef(null);
  const onDownload = () => {
    const dataURL = skinPngCanvas.toDataURL();
    const aTag = document.createElement("a");
    aTag.download = `${text === "" ? DEFAULT_TEXT : text}.png`;
    aTag.href = dataURL;
    aTag.click();
    setOpen(false);
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen} initialFocus={downloadBtnRef}>
        <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-4 "
              enterTo="opacity-100 translate-y-0 "
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 s"
              leaveTo="opacity-0 translate-y-4 "
            >
              <Dialog.Panel className="max-w-[600px] sm:w-[50%] w-full relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all">
                <div className="bg-white px-4 pt-5 pb-4 ">
                  <div className="">
                    <div className="transition-all mx-auto flex h-12 w-12 md:h-16 md:w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 ">
                      <ArrowDownTrayIcon className="transition-all h-6 md:h-8 text-blue-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center">
                      <Dialog.Title as="h2" className="transition-all text-lg md:text-xl font-bold leading-6 text-gray-900">
                        파일을 다운로드하시겠습니까?
                      </Dialog.Title>
                      <div className="w-full flex justify-center">
                        <h4 className="w-[90%] sm:w-[80%] overflow-x-auto transition-all mt-1 text-gray-400 whitespace-pre text-sm md:text-base">파일명: {text === "" ? DEFAULT_TEXT : text}.png</h4>
                      </div>
                      <input
                        className="transition-all w-[80%] mt-2 pl-5 py-1 rounded-md border text-sm md:text-base border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        type="text"
                        spellCheck="false"
                        placeholder={DEFAULT_TEXT}
                        value={text}
                        onChange={({ target: { value } }) => {
                          setText(value);
                        }}
                        onKeyDown={({ key }) => {
                          if (key === "Enter") {
                            onDownload();
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 flex justify-evenly">
                  <button
                    type="button"
                    className="flex w-2/5 justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    className="flex w-2/5 justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={onDownload}
                    ref={downloadBtnRef}
                  >
                    다운로드
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default DownloadModal;
