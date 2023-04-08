import React from 'react'
import '../styles/SummaryPanel.css'

interface Props {
  APIKeyProp: string;
  transcriptProp: string;
}

const SummaryPanel = (props: Props) => {
  return (
    <div id="summary-panel">
      <h2 id="summary-title">Summarize</h2>
      <button id="notes-button">Generate Notes</button>
      <p id="summary-content">This is where the summary will go <br/>
         Cras non tortor turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus aliquet ante turpis, eget dapibus nisl malesuada vulputate. Sed ut neque magna. Pellentesque sagittis tortor eu vulputate gravida. Morbi nec luctus metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin finibus, dui in porttitor faucibus, est erat blandit odio, et viverra sapien dui at mi. Integer volutpat orci vitae risus cursus rutrum. Mauris et tristique nunc, vitae fermentum dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris quis tellus feugiat, suscipit elit in, rhoncus purus. Fusce dictum pharetra diam, sed vestibulum nunc mollis ac. Aenean placerat orci at est placerat, nec tempus elit auctor.
        Aenean at ex et lacus dignissim varius. Phasellus interdum libero leo, sed imperdiet orci molestie fringilla. Sed laoreet neque non pulvinar facilisis. Pellentesque in sapien consequat, semper leo et, ullamcorper velit. Aliquam ut tristique justo. Mauris finibus, lectus vel consectetur tincidunt, orci neque dignissim elit, et maximus metus ligula non purus. Duis risus odio, hendrerit non semper ac, euismod nec risus. Aliquam vehicula, eros vel cursus porta, urna eros volutpat arcu, eu auctor felis libero vel erat. Integer sed orci elementum, vestibulum nunc vel, pharetra lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam eget erat ut nulla dictum imperdiet id ac nisl. Quisque eleifend auctor velit, sed finibus quam blandit finibus. Donec vehicula nibh a vestibulum scelerisque. Integer luctus laoreet libero, sit amet bibendum erat interdum quis. Curabitur id lectus vitae ante suscipit cursus.
        Nulla ac nulla sem. Sed libero leo, imperdiet at eleifend sed, mollis a purus. Aliquam quis sagittis sapien, vel ultrices quam. Fusce scelerisque ultricies malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam eget odio nulla. Cras porttitor fringilla sapien, vel lobortis est facilisis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut lacinia mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Vestibulum a eros ac ex euismod congue ultrices eget ligula. Sed aliquet, justo eget scelerisque laoreet, felis neque interdum nunc, ut fermentum felis magna sit amet magna. Donec odio odio, venenatis nec neque eget, fringilla condimentum elit. Pellentesque tincidunt vitae sem ut pharetra. Integer porta, diam eu ultrices fringilla, augue dolor sagittis magna, a hendrerit velit orci sit amet dolor. Integer leo mi, feugiat a sapien eget, accumsan efficitur lectus. Nullam fermentum sem id lacinia mollis. Morbi eget ultricies quam, vitae dictum magna. Nulla maximus tortor in bibendum venenatis. Aliquam erat volutpat. Ut vitae nibh ut neque ultricies dictum. Integer semper sapien eget massa porta tempus. Sed eu ex vel dolor feugiat aliquet quis eu nisl.
      </p>
    </div>
  )
}

export default SummaryPanel