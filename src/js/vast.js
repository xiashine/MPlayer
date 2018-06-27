const vast = {

   readvast: (xmlstring) => {
       //Read XML file

       const obj_vast = {
           media_files: [],
           impression: [],
           duration:0
       };

       const parser = new DOMParser();
       const xmldoc = parser.parseFromString(xmlstring, "text/xml");

       let impression = xmldoc.getElementsByTagName("Impression");
       if (impression != null) {
           for (let i = 0; i < impression.length; i++) {
               obj_vast.impression.push(impression[i].textContent);
           }
       }

       //Get Creative
       let creative = xmldoc.getElementsByTagName("Creative");

       for (let i = 0; i < creative.length; i++) {
           let media_files = {};
           let creative_linear = creative[i].getElementsByTagName("Linear");
           if (creative_linear != null) {
               for (let j = 0; j < creative_linear.length; j++) {

                   //Get media files
                   let creative_linear_mediafiles = creative_linear[j].getElementsByTagName("MediaFiles");
                   if (creative_linear_mediafiles != null) {
                       for (let k = 0; k < creative_linear_mediafiles.length; k++) {
                           let creative_linear_mediafiles_mediafile = creative_linear_mediafiles[k].getElementsByTagName("MediaFile")[0];
                           if (creative_linear_mediafiles_mediafile != null) {
                               media_files = {
                                   type:creative_linear_mediafiles_mediafile.getAttribute('type'),
                                   url:creative_linear_mediafiles_mediafile.textContent,
                                   width:creative_linear_mediafiles_mediafile.getAttribute('width'),
                                   height:creative_linear_mediafiles_mediafile.getAttribute('height')
                               }
                           }
                       }
                   }

                   //Get Clickthrough URL
                   let creative_linear_videoclicks = creative_linear[j].getElementsByTagName("VideoClicks");
                   if (creative_linear_videoclicks != null) {
                       for (let k = 0; k < creative_linear_videoclicks.length; k++) {
                           let creative_linear_videoclicks_clickthrough = creative_linear_videoclicks[k].getElementsByTagName("ClickThrough")[0];
                           let creative_linear_videoclicks_clickthrough_tracking = creative_linear_videoclicks[k].getElementsByTagName("ClickTracking")[0];
                           if (creative_linear_videoclicks_clickthrough != null) {
                               media_files.clickthrough = creative_linear_videoclicks_clickthrough.textContent;
                           }
                           if (creative_linear_videoclicks_clickthrough_tracking != null) {
                               media_files.clicktracking = creative_linear_videoclicks_clickthrough_tracking.textContent;
                           }
                       }
                   }

                   //Get AD Duration

                   let creative_linear_duration = creative_linear[j].getElementsByTagName("Duration")[0];
                   if (creative_linear_duration != null) {
                       let arrD = creative_linear_duration.textContent.split(':');
                       let strSecs = (+arrD[0]) * 60 * 60 + (+arrD[1]) * 60 + (+arrD[2]);
                       media_files.duration = strSecs;
                       obj_vast.duration=obj_vast.duration+strSecs;
                   }

               }
           }
           obj_vast.media_files.push(media_files);
       }


       return obj_vast;
   }
};
export default vast;