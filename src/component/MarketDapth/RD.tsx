import React, { useState } from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

const RD = () => {
  const [isMirrored, setIsMirrored] = useState(false);

  // Toggle mirroring of the panes
  // const toggleMirror = () => {
  //   setIsMirrored((prev) => !prev);
  // };

  return (
    <div>
      {/* <button onClick={toggleMirror} style={{ marginBottom: '10px' }}>
        {isMirrored ? 'Unmirror Panes' : 'Mirror Panes'}
      </button> */}

      <SplitterLayout
        vertical={false} // Horizontal split for side-by-side panels
        primaryIndex={isMirrored ? 1 : 0} // Switch panes based on mirror state
        primaryMinSize={100} // Minimum size for the primary pane
        secondaryMinSize={100} // Minimum size for the secondary pane
      >
        {/* Pane 1 */}
        <div style={{ background: isMirrored ? 'green' : 'red', padding: '10px' }}>
          <h2>{isMirrored ? 'Pane 2' : 'Pane 1'}</h2>
          <p>{isMirrored ? 'Content for the second pane (now on the left). buy' : 'Content for the first pane.'}</p>
        </div>

        {/* Pane 2 */}
        <div style={{ background: isMirrored ? 'red' : 'green', padding: '10px' }}>
          <h2>{isMirrored ? 'Pane 1' : 'Pane 2'}</h2>
          <p>{isMirrored ? 'Content for the first pane (now on the right). sell' : 'Content for the second pane.'}</p>
        </div>
      </SplitterLayout>
    </div>
  );
};

export default RD;
