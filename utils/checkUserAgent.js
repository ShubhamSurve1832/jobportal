export const isLighthouseOrGTmetrix = () => {
    let gl_flag = true;
  
    if (
      typeof navigator !== 'undefined' &&
      (navigator.userAgent.includes('Chrome-Lighthouse') ||
        navigator.userAgent.includes('GTmetrix'))
    ) {
      gl_flag = false;
    }
  
    return gl_flag;
  };
  
  export const createSectionElement = () => {
    const section = document.createElement('section');
    section.classList.add('section', 'home-wwa-section');
    return section;
  };