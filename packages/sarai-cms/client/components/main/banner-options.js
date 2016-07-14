Template.BannerOptions.created = function() {
  this.uploadedFile = ''
}

Template.BannerOptions.onRendered(() => {
  // $("#cms-banner-title-div").addClass("is-dirty");
  // $("#cms-banner-align-div").addClass("is-dirty");
  // $("#cms-banner-subtext-div").addClass("is-dirty");
  // $("#cms-banner-text-div").addClass("is-dirty");
  // $("#cms-banner-button-text-div").addClass("is-dirty");

  const dialog = document.querySelector('#cms-banner-dialog')

    dialog.querySelector('.cancel').addEventListener('click', () => {
      dialog.close();
    });

    dialog.querySelector('.save').addEventListener('click', () => {
      const action = this.action

      const textPosition = $('#cms-banner-slide-text-position-input').val()
      const title = $('#cms-banner-slide-title-input').val()
      const subtitle = $('#cms-banner-slide-subtitle-input').val()
      const text = $('#cms-banner-slide-text-input').val()
      const buttonText = $('#cms-banner-slide-button-text-input').val()
      const buttonHref = $('#cms-banner-slide-button-href-input').val()
      const rank = $('#cms-banner-slide-rank-input').val()

      if (action == 'add') {
        console.log('saving add')
        Meteor.call('cms-banner-slide-add', this.uploadedFile, textPosition, title, subtitle, text, buttonText, buttonHref, rank, (error, result) => {

        })
      }

      else if (action == 'edit') {
        console.log('saving edit')
      }

    })
})

Template.BannerOptions.events({
  'click #cms-banner-slide-add': () => {
    this.action = 'add'

    const dialog = document.querySelector('#cms-banner-dialog');
    dialog.showModal();

    $('#cms-banner-slide-text-position-input').val("")
    $('#cms-banner-slide-title-input').val("")
    $('#cms-banner-slide-subtitle-input').val("")
    $('#cms-banner-slide-text-input').val("")
    $('#cms-banner-slide-button-text-input').val("")
    $('#cms-banner-slide-button-href-input').val("")
    $('#cms-banner-slide-rank-input').val("")
  }
});

Template.BannerOptions.helpers({
  truncateTableEntry: (text) => {

    if (text.length > 20) {
      return `${text.substring(0, 20)}...`
    } else {
      return text
    }
  },

  dialogHeader: () => {
    const action = Session.get('action')

    if (action == 'add') {
      return 'Add Slide'
    } else if (action == 'edit') {
      return 'Edit Slide'
    }
  },

  sliderEntries: () => {
    return [
      {
        img: '/upload/.uploads/main/banana_banner.jpg',
        textPosition: 'lower-left',
        title: 'SMARTER CROP MANAGEMENT',
        subTitle: 'Helping farmers to produce more with less',
        text: '<p>Know the right amount of nutrient, the adequate management practices for pest and diseases, and the right amount of water for maximum yield.<p>',
        buttonText: 'Know More',
        buttonLink: '/'
      },
      {
        img: '/upload/.uploads/main/cacao_banner.jpg',
        textPosition: 'lower-left',
        title: 'SMARTER CROP MANAGEMENT',
        subTitle: 'Helping farmers to produce more with less',
        text: '<p>Know the right amount of nutrient, the adequate management practices for pest and diseases, and the right amount of water for maximum yield.<p>',
        buttonText: 'Know More',
        buttonLink: '/'
      },
      {
        img: '/upload/.uploads/main/coconut_banner.jpg',
        textPosition: 'lower-left',
        title: 'SMARTER CROP MANAGEMENT',
        subTitle: 'Helping farmers to produce more with less',
        text: '<p>Know the right amount of nutrient, the adequate management practices for pest and diseases, and the right amount of water for maximum yield.<p>',
        buttonText: 'Know More',
        buttonLink: '/'
      },
    ]
  },

  myCallbacks: () => {
    return {
      formData: () => {
        return {
          filename: 'banner-img',
          uploadGroup: 'main'
        }
      },
      finished: (index, fileInfo, context) => {
        this.uploadedFile = `${uploadDirPrefix()}${fileInfo.path}`
      }
    }
  }
})