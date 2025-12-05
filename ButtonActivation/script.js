function initializeButtonActivation(buttonContainerID, sectionContainerID){
  const buttonContainer = document.getElementById(buttonContainerID);
  const sectionContainer = document.getElementById(sectionContainerID);
  const buttons = buttonContainer.querySelectorAll('button');
  const sections = sectionContainer.querySelectorAll('section');
  // console.log(sections);
  // console.log(buttons);
  function handleButtonClick(event){
    buttons.forEach(button=>button.classList.remove('active'));
    const clickedButton=event.target;
    clickedButton.classList.add('active');
    const targetSectionId=clickedButton.dataset.target;
    sections.forEach(section=>{
      if(section.id === targetSectionId){
        section.classList.add("active");
      }else{
        section.classList.remove("active");
      }
    })

  }
  buttons.forEach(button=>{
    button.addEventListener('click', handleButtonClick)
  })

}
document.addEventListener("DOMContentLoaded", function(){
  initializeButtonActivation("button-container", "section-container");
});

