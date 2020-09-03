export default function() {
  return [
    {
      title: "Dashboard Overview",
      to: "/blog-overview",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "View Articles",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/blog-posts",
    },
    {
      title: "Add New Article",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-post",
    },
    {
      title: "Livestreaming URLS",
      htmlBefore: '<i class="material-icons">video_settings</i>',
      to: "/livestream-urls"
    },
    {
      title: "Video on Demand",
      htmlBefore: '<i class="material-icons">queue_play_next</i>',
      to: "/videos-on-demand"
    },
    {
      title: "Analytics",
      htmlBefore: '<i class="material-icons">timeline</i>',
      to: "/#"
    },
    {
      title: "Social Media API Manager",
      htmlBefore: '<i class="material-icons">group</i>',
      to: "/social-media-manager"

    }
    // },
    // {
    //   title: "Forms & Components",
    //   htmlBefore: '<i class="material-icons">view_module</i>',
    //   to: "/components-overview",
    // },
    // {
    //   title: "Tables",
    //   htmlBefore: '<i class="material-icons">table_chart</i>',
    //   to: "/tables",
    // },
    // {
    //   title: "User Profile",
    //   htmlBefore: '<i class="material-icons">person</i>',
    //   to: "/user-profile-lite",
    // },
    // {
    //   title: "Errors",
    //   htmlBefore: '<i class="material-icons">error</i>',
    //   to: "/errors",
    // }
  ];
}
