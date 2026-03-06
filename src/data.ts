import { BookOpen, Building, Compass, Layers, Mail, MapPin, Phone, User } from 'lucide-react';

export type Language = 'en' | 'vi';

export interface Project {
  id: string;
  title: { en: string; vi: string };
  category: { en: string; vi: string };
  year: string;
  description: { en: string; vi: string };
  image: string; // Main hero image
  images: string[]; // Additional gallery images
  specs: {
    area: string;
    location: string;
    status: { en: string; vi: string };
  };
  details?: {
    facts: Array<{ label: { en: string; vi: string }; value: { en: string; vi: string } }>;
    materials: { en: string[]; vi: string[] };
    sustainability: { en: string[]; vi: string[] };
  };
  media?: {
    type: 'video' | '3d';
    url: string;
    thumbnail?: string;
  };
}

export interface Content {
// ... (rest of interfaces remain the same)
  common: {
    name: string;
    role: { en: string; vi: string };
    contact: {
      email: string;
      phone: string;
      location: { en: string; vi: string };
      socials: {
        tiktok: string;
        facebook: string;
        instagram: string;
      };
    };
  };
  cover: {
    subtitle: { en: string; vi: string };
    enter: { en: string; vi: string };
  };
  profile: {
    title: { en: string; vi: string };
    photo: string;
    about: { en: string; vi: string };
    philosophy: {
      title: { en: string; vi: string };
      content: { en: string; vi: string };
    };
    experience: {
      title: { en: string; vi: string };
      items: Array<{
        role: { en: string; vi: string };
        company: string;
        period: string;
        desc: { en: string; vi: string };
      }>;
    };
    education: {
      title: { en: string; vi: string };
      items: Array<{ year: string; degree: { en: string; vi: string }; school: string }>;
    };
    skills: {
      title: { en: string; vi: string };
      items: string[];
    };
    awards: {
      title: { en: string; vi: string };
      items: Array<{ year: string; title: { en: string; vi: string }; organization: string }>;
    };
    milestones: {
      title: { en: string; vi: string };
      items: Array<{ year: string; event: { en: string; vi: string } }>;
    };
  };
  projects: Project[];
  back: {
    thankYou: { en: string; vi: string };
    getInTouch: { en: string; vi: string };
  };
}

export const content: Content = {
  common: {
    name: "MINH HẠNH",
    role: {
      en: "Architect & Interior Designer",
      vi: "Kiến Trúc Sư & Thiết Kế Nội Thất"
    },
    contact: {
      email: "minhhanh.arch@example.com",
      phone: "+84 90 123 4567",
      location: {
        en: "Ho Chi Minh City, Vietnam",
        vi: "TP. Hồ Chí Minh, Việt Nam"
      },
      socials: {
        tiktok: "https://tiktok.com/@minhhanh.arch",
        facebook: "https://facebook.com/minhhanh.arch",
        instagram: "https://instagram.com/minhhanh.arch"
      }
    }
  },
  cover: {
    subtitle: {
      en: "Portfolio 2024-2026",
      vi: "Hồ Sơ Năng Lực 2024-2026"
    },
    enter: {
      en: "Open Portfolio",
      vi: "Mở Hồ Sơ"
    }
  },
  profile: {
    title: { en: "About Me", vi: "Giới Thiệu" },
    photo: "https://picsum.photos/seed/minhhanh/400/500", // Placeholder for professional photo
    about: {
      en: "I am a passionate architect with a focus on sustainable design and human-centric spaces. With 5 years of experience in residential and commercial projects, I believe architecture is not just about buildings, but about creating environments where life happens.",
      vi: "Tôi là một kiến trúc sư đam mê với định hướng thiết kế bền vững và lấy con người làm trung tâm. Với 5 năm kinh nghiệm trong các dự án nhà ở và thương mại, tôi tin rằng kiến trúc không chỉ là những tòa nhà, mà là việc kiến tạo những không gian nơi cuộc sống thăng hoa."
    },
    philosophy: {
      title: { en: "Design Philosophy", vi: "Triết Lý Thiết Kế" },
      content: {
        en: "My design philosophy centers on the harmony between nature, culture, and function. I strive to create spaces that breathe, utilizing natural light and ventilation to reduce energy consumption while enhancing well-being. Every line drawn is a dialogue between the site's history and its future users.",
        vi: "Triết lý thiết kế của tôi tập trung vào sự hài hòa giữa thiên nhiên, văn hóa và công năng. Tôi nỗ lực tạo ra những không gian biết 'thở', tận dụng ánh sáng và thông gió tự nhiên để giảm thiểu tiêu thụ năng lượng đồng thời nâng cao sức khỏe. Mỗi nét vẽ là một cuộc đối thoại giữa lịch sử của khu đất và những người sử dụng tương lai."
      }
    },
    experience: {
      title: { en: "Experience", vi: "Kinh Nghiệm" },
      items: [
        {
          role: { en: "Senior Architect", vi: "Kiến Trúc Sư Chủ Trì" },
          company: "Green Space Studio",
          period: "2024 - Present",
          desc: { en: "Leading sustainable residential projects.", vi: "Chủ trì các dự án nhà ở bền vững." }
        },
        {
          role: { en: "Junior Architect", vi: "Kiến Trúc Sư" },
          company: "Urban Arch Partners",
          period: "2022 - 2024",
          desc: { en: "Participated in large-scale commercial competitions.", vi: "Tham gia các cuộc thi thương mại quy mô lớn." }
        }
      ]
    },
    education: {
      title: { en: "Education", vi: "Học Vấn" },
      items: [
        {
          year: "2019 - 2024",
          degree: { en: "Bachelor of Architecture", vi: "Cử Nhân Kiến Trúc" },
          school: "University of Architecture HCMC"
        }
      ]
    },
    skills: {
      title: { en: "Skills", vi: "Kỹ Năng" },
      items: ["AutoCAD", "Revit", "SketchUp", "Lumion", "Photoshop", "InDesign", "Sustainable Design", "Project Management"]
    },
    awards: {
      title: { en: "Awards", vi: "Giải Thưởng" },
      items: [
        { year: "2023", title: { en: "Best Residential Design", vi: "Thiết Kế Nhà Ở Xuất Sắc" }, organization: "Vietnam Architecture Awards" },
        { year: "2022", title: { en: "Young Architect of the Year", vi: "KTS Trẻ Của Năm" }, organization: "Ashui Awards" },
        { year: "2021", title: { en: "Silver Medal", vi: "Huy Chương Bạc" }, organization: "National Student Design Competition" }
      ]
    },
    milestones: {
      title: { en: "Milestones", vi: "Cột Mốc" },
      items: [
        { year: "2024", event: { en: "Founded Green Space Studio", vi: "Thành lập Green Space Studio" } },
        { year: "2022", event: { en: "Lead Architect for Eco Office Hub", vi: "KTS chủ trì dự án Eco Office Hub" } },
        { year: "2019", event: { en: "Graduated Valedictorian", vi: "Tốt nghiệp Thủ khoa" } }
      ]
    }
  },
  projects: [
    {
      id: "p1",
      title: { en: "The Green Villa", vi: "Biệt Thự Xanh" },
      category: { en: "Residential", vi: "Nhà Ở" },
      year: "2024",
      description: {
        en: "A modern villa designed to maximize natural ventilation and light, integrating vertical gardens to cool the living spaces naturally. The layout promotes family interaction while maintaining individual privacy.",
        vi: "Một biệt thự hiện đại được thiết kế để tối đa hóa thông gió và ánh sáng tự nhiên, tích hợp các khu vườn thẳng đứng để làm mát không gian sống. Bố trí mặt bằng khuyến khích sự tương tác gia đình trong khi vẫn giữ được sự riêng tư cá nhân."
      },
      image: "https://picsum.photos/seed/arch1/800/600",
      images: [
        "https://picsum.photos/seed/arch1-detail1/400/300",
        "https://picsum.photos/seed/arch1-detail2/400/300",
        "https://picsum.photos/seed/arch1-detail3/400/300"
      ],
      specs: {
        area: "350 m²",
        location: "District 2, HCMC",
        status: { en: "Completed", vi: "Đã hoàn thành" }
      },
      details: {
        facts: [
          { label: { en: "Structure", vi: "Kết cấu" }, value: { en: "Reinforced Concrete", vi: "Bê tông cốt thép" } },
          { label: { en: "Floors", vi: "Số tầng" }, value: { en: "2 Floors + 1 Attic", vi: "2 tầng + 1 tầng áp mái" } }
        ],
        materials: {
          en: ["Polished Concrete", "Recycled Wood", "Low-E Glass"],
          vi: ["Bê tông mài", "Gỗ tái chế", "Kính Low-E"]
        },
        sustainability: {
          en: ["Solar Panels", "Rainwater Harvesting", "Passive Cooling"],
          vi: ["Pin năng lượng mặt trời", "Thu gom nước mưa", "Làm mát thụ động"]
        }
      },
      media: {
        type: 'video',
        url: 'https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&mute=1&loop=1&playlist=ScMzIvxBSi4', // Generic architectural video
      }
    },
    {
      id: "p2",
      title: { en: "Urban Coffee Space", vi: "Không Gian Cà Phê Đô Thị" },
      category: { en: "Commercial", vi: "Thương Mại" },
      year: "2023",
      description: {
        en: "Renovation of an old industrial warehouse into a vibrant community coffee hub. The design preserves historical textures like exposed brick and steel beams while adding modern amenities and warm lighting.",
        vi: "Cải tạo một nhà kho công nghiệp cũ thành một trung tâm cà phê cộng đồng sôi động. Thiết kế bảo tồn các kết cấu lịch sử như gạch trần và dầm thép đồng thời bổ sung các tiện nghi hiện đại và ánh sáng ấm áp."
      },
      image: "https://picsum.photos/seed/arch2/800/600",
      images: [
        "https://picsum.photos/seed/arch2-detail1/400/300",
        "https://picsum.photos/seed/arch2-detail2/400/300",
        "https://picsum.photos/seed/arch2-detail3/400/300"
      ],
      specs: {
        area: "120 m²",
        location: "District 1, HCMC",
        status: { en: "Completed", vi: "Đã hoàn thành" }
      },
      details: {
        facts: [
          { label: { en: "Style", vi: "Phong cách" }, value: { en: "Industrial Chic", vi: "Công nghiệp hiện đại" } },
          { label: { en: "Capacity", vi: "Sức chứa" }, value: { en: "45 Guests", vi: "45 khách" } }
        ],
        materials: {
          en: ["Exposed Brick", "Steel Beams", "Reclaimed Timber"],
          vi: ["Gạch trần", "Dầm thép", "Gỗ tận dụng"]
        },
        sustainability: {
          en: ["Natural Ventilation", "LED Lighting", "Local Sourcing"],
          vi: ["Thông gió tự nhiên", "Chiếu sáng LED", "Nguồn cung địa phương"]
        }
      },
      media: {
        type: '3d',
        url: 'https://sketchfab.com/models/564e02a97528499388771b695462f4c4/embed?autostart=1&ui_controls=1&ui_infos=0', // Generic house model
      }
    },
    {
      id: "p3",
      title: { en: "Skyline Office", vi: "Văn Phòng Skyline" },
      category: { en: "Office", vi: "Văn Phòng" },
      year: "2023",
      description: {
        en: "An open-plan office design focusing on collaboration and flexibility. Features include modular furniture, acoustic pods for privacy, and a biophilic design approach to enhance employee well-being.",
        vi: "Thiết kế văn phòng không gian mở tập trung vào sự hợp tác và linh hoạt. Các tính năng bao gồm nội thất mô-đun, các buồng cách âm cho sự riêng tư và cách tiếp cận thiết kế sinh thái để nâng cao sức khỏe nhân viên."
      },
      image: "https://picsum.photos/seed/arch3/800/600",
      images: [
        "https://picsum.photos/seed/arch3-detail1/400/300",
        "https://picsum.photos/seed/arch3-detail2/400/300",
        "https://picsum.photos/seed/arch3-detail3/400/300"
      ],
      specs: {
        area: "500 m²",
        location: "Binh Thanh Dist, HCMC",
        status: { en: "In Progress", vi: "Đang thi công" }
      },
      details: {
        facts: [
          { label: { en: "Workstations", vi: "Chỗ làm việc" }, value: { en: "120 Units", vi: "120 chỗ" } },
          { label: { en: "Meeting Rooms", vi: "Phòng họp" }, value: { en: "08 Rooms", vi: "08 phòng" } }
        ],
        materials: {
          en: ["Acoustic Panels", "Recycled Carpet", "Glass Partitions"],
          vi: ["Tấm tiêu âm", "Thảm tái chế", "Vách ngăn kính"]
        },
        sustainability: {
          en: ["Smart Lighting", "Air Purification", "Zero VOC Paints"],
          vi: ["Chiếu sáng thông minh", "Lọc không khí", "Sơn không độc hại"]
        }
      }
    },
    {
      id: "p4",
      title: { en: "Riverside Resort", vi: "Khu Nghỉ Dưỡng Ven Sông" },
      category: { en: "Hospitality", vi: "Nghỉ Dưỡng" },
      year: "2022",
      description: {
        en: "A boutique resort blending traditional Vietnamese materials like bamboo and thatch with contemporary luxury standards. The architecture respects the local topography and minimizes environmental impact.",
        vi: "Một khu nghỉ dưỡng boutique kết hợp các vật liệu truyền thống Việt Nam như tre và mái lá với các tiêu chuẩn sang trọng đương đại. Kiến trúc tôn trọng địa hình địa phương và giảm thiểu tác động môi trường."
      },
      image: "https://picsum.photos/seed/arch4/800/600",
      images: [
        "https://picsum.photos/seed/arch4-detail1/400/300",
        "https://picsum.photos/seed/arch4-detail2/400/300",
        "https://picsum.photos/seed/arch4-detail3/400/300"
      ],
      specs: {
        area: "2000 m²",
        location: "Hoi An, Vietnam",
        status: { en: "Concept", vi: "Ý tưởng" }
      },
      details: {
        facts: [
          { label: { en: "Villas", vi: "Biệt thự" }, value: { en: "15 Units", vi: "15 căn" } },
          { label: { en: "Main Hall", vi: "Sảnh chính" }, value: { en: "Bamboo Structure", vi: "Kết cấu tre" } }
        ],
        materials: {
          en: ["Local Bamboo", "Thatch", "Stone Masonry"],
          vi: ["Tre địa phương", "Mái lá", "Đá hộc"]
        },
        sustainability: {
          en: ["Natural Ventilation", "Water Recycling", "Local Sourcing"],
          vi: ["Thông gió tự nhiên", "Tái chế nước", "Nguồn cung địa phương"]
        }
      }
    },
    {
      id: "p5",
      title: { en: "The Glass House", vi: "Nhà Kính" },
      category: { en: "Residential", vi: "Nhà Ở" },
      year: "2022",
      description: {
        en: "A transparent living space nestled in the forest, blurring the boundaries between indoor and outdoor. The structure uses high-performance glass to ensure thermal comfort while offering panoramic views.",
        vi: "Một không gian sống trong suốt ẩn mình trong rừng, xóa nhòa ranh giới giữa trong nhà và ngoài trời. Cấu trúc sử dụng kính hiệu suất cao để đảm bảo tiện nghi nhiệt trong khi cung cấp tầm nhìn toàn cảnh."
      },
      image: "https://picsum.photos/seed/arch5/800/600",
      images: [
        "https://picsum.photos/seed/arch5-detail1/400/300",
        "https://picsum.photos/seed/arch5-detail2/400/300",
        "https://picsum.photos/seed/arch5-detail3/400/300"
      ],
      specs: {
        area: "280 m²",
        location: "Da Lat, Vietnam",
        status: { en: "Completed", vi: "Đã hoàn thành" }
      },
      details: {
        facts: [
          { label: { en: "Glass Type", vi: "Loại kính" }, value: { en: "Triple Glazed Low-E", vi: "Kính Low-E 3 lớp" } },
          { label: { en: "Foundation", vi: "Móng" }, value: { en: "Steel Stilts", vi: "Hệ cột thép" } }
        ],
        materials: {
          en: ["Structural Steel", "High-Perf Glass", "Pine Wood"],
          vi: ["Thép kết cấu", "Kính hiệu suất cao", "Gỗ thông"]
        },
        sustainability: {
          en: ["Geothermal Heating", "Minimal Footprint", "Passive Solar"],
          vi: ["Sưởi địa nhiệt", "Tác động tối thiểu", "Năng lượng mặt trời thụ động"]
        }
      }
    },
    {
      id: "p6",
      title: { en: "Eco Office Hub", vi: "Văn Phòng Sinh Thái" },
      category: { en: "Office", vi: "Văn Phòng" },
      year: "2021",
      description: {
        en: "A sustainable office complex featuring a double-skin facade for climate control and extensive rooftop gardens. The design promotes a healthy work environment and reduces the building's carbon footprint.",
        vi: "Một khu phức hợp văn phòng bền vững với mặt tiền hai lớp để kiểm soát khí hậu và các khu vườn trên mái rộng lớn. Thiết kế thúc đẩy môi trường làm việc lành mạnh và giảm lượng khí thải carbon của tòa nhà."
      },
      image: "https://picsum.photos/seed/arch6/800/600",
      images: [
        "https://picsum.photos/seed/arch6-detail1/400/300",
        "https://picsum.photos/seed/arch6-detail2/400/300",
        "https://picsum.photos/seed/arch6-detail3/400/300"
      ],
      specs: {
        area: "1500 m²",
        location: "District 7, HCMC",
        status: { en: "Completed", vi: "Đã hoàn thành" }
      },
      details: {
        facts: [
          { label: { en: "Facade", vi: "Mặt tiền" }, value: { en: "Double-Skin Glass", vi: "Kính hai lớp" } },
          { label: { en: "Green Area", vi: "Diện tích xanh" }, value: { en: "450 m²", vi: "450 m²" } }
        ],
        materials: {
          en: ["Aluminum Mesh", "Recycled Steel", "Vertical Greenery"],
          vi: ["Lưới nhôm", "Thép tái chế", "Cây xanh thẳng đứng"]
        },
        sustainability: {
          en: ["Greywater Recycling", "BMS Control", "Rooftop Solar"],
          vi: ["Tái chế nước xám", "Hệ thống BMS", "Điện mặt trời mái nhà"]
        }
      }
    },
    {
      id: "p7",
      title: { en: "Cultural Center", vi: "Trung Tâm Văn Hóa" },
      category: { en: "Public", vi: "Công Cộng" },
      year: "2021",
      description: {
        en: "A community hub designed to host art exhibitions, workshops, and performances. The form is inspired by traditional pottery shapes, creating a landmark that honors local heritage.",
        vi: "Một trung tâm cộng đồng được thiết kế để tổ chức các triển lãm nghệ thuật, hội thảo và biểu diễn. Hình khối được lấy cảm hứng từ các hình dáng gốm truyền thống, tạo nên một điểm nhấn tôn vinh di sản địa phương."
      },
      image: "https://picsum.photos/seed/arch7/800/600",
      images: [
        "https://picsum.photos/seed/arch7-detail1/400/300",
        "https://picsum.photos/seed/arch7-detail2/400/300",
        "https://picsum.photos/seed/arch7-detail3/400/300"
      ],
      specs: {
        area: "800 m²",
        location: "Bat Trang, Hanoi",
        status: { en: "Competition", vi: "Cuộc thi" }
      }
    },
    {
      id: "p8",
      title: { en: "Minimalist Apartment", vi: "Căn Hộ Tối Giản" },
      category: { en: "Interior", vi: "Nội Thất" },
      year: "2020",
      description: {
        en: "An interior renovation project transforming a cramped apartment into a spacious, light-filled home using a monochromatic palette and smart storage solutions.",
        vi: "Một dự án cải tạo nội thất biến một căn hộ chật hẹp thành một ngôi nhà rộng rãi, tràn ngập ánh sáng sử dụng bảng màu đơn sắc và các giải pháp lưu trữ thông minh."
      },
      image: "https://picsum.photos/seed/arch8/800/600",
      images: [
        "https://picsum.photos/seed/arch8-detail1/400/300",
        "https://picsum.photos/seed/arch8-detail2/400/300",
        "https://picsum.photos/seed/arch8-detail3/400/300"
      ],
      specs: {
        area: "95 m²",
        location: "District 4, HCMC",
        status: { en: "Completed", vi: "Đã hoàn thành" }
      }
    },
    {
      id: "p9",
      title: { en: "Bamboo Pavilion", vi: "Nhà Tre" },
      category: { en: "Landscape", vi: "Cảnh Quan" },
      year: "2020",
      description: {
        en: "An experimental structure made entirely of treated bamboo, serving as a rest stop in a public park. The design explores the structural potential of bamboo in creating complex curved forms.",
        vi: "Một cấu trúc thử nghiệm được làm hoàn toàn bằng tre đã qua xử lý, phục vụ như một trạm nghỉ trong công viên công cộng. Thiết kế khám phá tiềm năng kết cấu của tre trong việc tạo ra các hình khối cong phức tạp."
      },
      image: "https://picsum.photos/seed/arch9/800/600",
      images: [
        "https://picsum.photos/seed/arch9-detail1/400/300",
        "https://picsum.photos/seed/arch9-detail2/400/300",
        "https://picsum.photos/seed/arch9-detail3/400/300"
      ],
      specs: {
        area: "50 m²",
        location: "Thanh Da, HCMC",
        status: { en: "Completed", vi: "Đã hoàn thành" }
      }
    },
    {
      id: "p10",
      title: { en: "Floating Library", vi: "Thư Viện Nổi" },
      category: { en: "Public", vi: "Công Cộng" },
      year: "2020",
      description: {
        en: "A community library built on a floating platform in the Mekong Delta. The design adapts to rising water levels and uses local materials like timber and coconut leaves.",
        vi: "Một thư viện cộng đồng được xây dựng trên nền tảng nổi ở Đồng bằng sông Cửu Long. Thiết kế thích ứng với mực nước dâng và sử dụng các vật liệu địa phương như gỗ và lá dừa."
      },
      image: "https://picsum.photos/seed/arch10/800/600",
      images: [
        "https://picsum.photos/seed/arch10-detail1/400/300",
        "https://picsum.photos/seed/arch10-detail2/400/300",
        "https://picsum.photos/seed/arch10-detail3/400/300"
      ],
      specs: {
        area: "150 m²",
        location: "Can Tho, Vietnam",
        status: { en: "Concept", vi: "Ý tưởng" }
      }
    },
    {
      id: "p11",
      title: { en: "Zen Garden Villa", vi: "Biệt Thự Vườn Thiền" },
      category: { en: "Residential", vi: "Nhà Ở" },
      year: "2019",
      description: {
        en: "A minimalist residence centered around a Japanese-style dry garden. The architecture frames specific views of nature, creating a serene retreat from the bustling city.",
        vi: "Một ngôi nhà tối giản tập trung xung quanh một khu vườn khô kiểu Nhật. Kiến trúc đóng khung các góc nhìn cụ thể về thiên nhiên, tạo ra một nơi ẩn náu thanh bình khỏi thành phố nhộn nhịp."
      },
      image: "https://picsum.photos/seed/arch11/800/600",
      images: [
        "https://picsum.photos/seed/arch11-detail1/400/300",
        "https://picsum.photos/seed/arch11-detail2/400/300",
        "https://picsum.photos/seed/arch11-detail3/400/300"
      ],
      specs: {
        area: "400 m²",
        location: "District 9, HCMC",
        status: { en: "Completed", vi: "Đã hoàn thành" }
      }
    },
    {
      id: "p12",
      title: { en: "Tech Hub Tower", vi: "Tháp Công Nghệ" },
      category: { en: "Commercial", vi: "Thương Mại" },
      year: "2019",
      description: {
        en: "A mixed-use high-rise featuring co-working spaces, tech incubators, and retail. The facade features a dynamic shading system that adjusts to the sun's position throughout the day.",
        vi: "Một tòa nhà cao tầng đa năng bao gồm không gian làm việc chung, vườn ươm công nghệ và bán lẻ. Mặt tiền có hệ thống che nắng động điều chỉnh theo vị trí của mặt trời trong suốt cả ngày."
      },
      image: "https://picsum.photos/seed/arch12/800/600",
      images: [
        "https://picsum.photos/seed/arch12-detail1/400/300",
        "https://picsum.photos/seed/arch12-detail2/400/300",
        "https://picsum.photos/seed/arch12-detail3/400/300"
      ],
      specs: {
        area: "12000 m²",
        location: "District 2, HCMC",
        status: { en: "Competition", vi: "Cuộc thi" }
      }
    }
  ],
  back: {
    thankYou: {
      en: "Thank You",
      vi: "Cảm Ơn"
    },
    getInTouch: {
      en: "Let's build something amazing together.",
      vi: "Hãy cùng nhau kiến tạo những điều tuyệt vời."
    }
  }
};
