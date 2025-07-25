import React, { useState, useContext } from 'react';

// 侧边栏，包含这个county的所有note
import { NoteType } from '../types/NoteType';
import { Note } from './Note';
import { LoadingNote } from './LoadingNote';
import { eventContext } from '../context/eventContext';

type NoteContainerProps = {
  visible: boolean;
  handleNoteClick: (noteObj: NoteType) => void;
  handlePageClose: (pageState: boolean) => void;
  onShowCreateEvent: () => void;
};

export const NoteContainer = (props: NoteContainerProps) => {

  const { data, handler } = useContext(eventContext);

  const handleHideButtonClick = (pageState: boolean) => {
    props.handlePageClose(pageState);
  };

  const handleEventCreated = () => {
    // Refresh event list
    if (data.countyId) {
      handler.refreshNotes();
    }
  };

  if (!props.visible)
    return (
      <div
        className="relative flex basis-1/80 left-0
                  rounded-r-2xl bg-gray-200 mr-3"
      >
        <button
          onClick={() => handleHideButtonClick(true)}
          className="
            absolute top-2/5 left-0
            py-3 pl-1 pr-2                 
            rounded-r-full shadow-lg
            bg-indigo-400 text-white font-semibold
            hover:bg-indigo-600
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75
            transition-all duration-300 ease-in-out
            "
        >
          <img src="arrow.png" className="h-3 w-3" />
        </button>
      </div>
    );
  else {
    return (
      <>
        <div className="relative flex left-0 basis-3/10 overflow-hidden mr-3 rounded-r-2xl">
          <div className="relative flex flex-col flex-grow bg-gray-100 shadow-lg p-3 pr-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-indigo-700 pl-3">
                County: {data.countyName ? data.countyName : 'Not selected'}
              </h2>
              {data.countyName && (
                <button
                  onClick={props.onShowCreateEvent}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                >
                  + Create Event
                </button>
              )}
            </div>

            <div className="flex-grow overflow-y-auto pr-4">
              {data.countyName ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.notes.map((note) => (
                    <Note
                      key={note.noteId}
                      {...{ note: note, handleNoteClick: props.handleNoteClick }}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-2 gap-7">
                  {new Array(12).fill(0).map((e, i) => (
                    <LoadingNote key={i} />
                  ))}
                </div>
              )}

              <button
                onClick={() => handleHideButtonClick(false)}
                className="
                  absolute right-0 top-2/5 overflow-visible
                  px-2 py-3 pl-2 pr-2
                  bg-indigo-400 text-white font-semibold
                  rounded-l-full shadow-lg
                  hover:bg-indigo-600
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75
                  transition-all duration-300 ease-in-out
                  "
              >
                <img src="arrow.png" className="h-3 w-3 rotate-180" />
              </button>

            </div>
          </div>
        </div>
      </>
    );
  }
};
