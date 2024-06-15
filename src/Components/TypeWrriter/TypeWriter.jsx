import React from 'react'
import {useTypewriter, Cursor} from 'react-simple-typewriter'

const TypeWriter = () => {
  
    const [text] = useTypewriter({
        words: [' SPEACIAL ASSIGNMENT SECTION', 'SPEACIAL NEW ASSIGNMENT', ' SPEACIAL ASSIGNMENT CREATE'],
        loop: 3,
        onLoopDone: () => console.log(`loop completed after 3 runs.`)
      })

    return (
            <div className='App'>
                <span className='text-3xl text-center  font-bold mb-5 '>{text}</span>
                <Cursor cursorColor='gray' />
            </div>
    );
};

export default TypeWriter;