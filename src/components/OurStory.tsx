import { useScrollReveal } from "../hooks/useScrollReveal";
import "./OurStory.css";

const MILESTONES: { year: string; emoji: string; title: string; desc: string[] }[] = [
  {
    year: "2022",
    emoji: "💫",
    title: "Lần đầu gặp gỡ",
    desc: [
      "“Chê Trọng” – đó có lẽ là ấn tượng đầu tiên mà chúng mình dành cho nhau.",
      "Cuộc gặp gỡ tưởng chừng chỉ thoáng qua, bởi khi ấy, mỗi người đều đã có những lựa chọn và con đường riêng. Chúng mình cứ ngỡ rằng sẽ chẳng có câu chuyện nào tiếp nối sau lần gặp gỡ ấy.",
      "Nhưng có lẽ, duyên phận luôn có cách riêng để đưa hai người đến bên nhau…",
    ],
  },
  {
    year: "2023",
    emoji: "💌",
    title: "Năm trái hồng xiêm, trăm câu chuyện khởi đầu bất ngờ",
    desc: [
      "Mọi chuyện bắt đầu từ một lần bất ngờ với “trái hồng xiêm”, quà quê nhà Lan Anh, chị đồng nghiệp mang về cho Trọng.",
      "Từ một món quà nhỏ, một lời cảm ơn qua tin nhắn – cũng là lần đầu tiên Trọng chủ động liên lạc, người đàn ông có vẻ hơi \"ngại ngùng\". Chẳng ai ngờ rằng, từ một câu chuyện giản đơn ấy, những dòng tin nhắn cứ dài thêm, những câu chuyện cứ nối tiếp và hai trái tim dần tìm thấy sự đồng điệu.",
      "Từ những người từng xa lạ, chúng mình bắt đầu bước vào thế giới của nhau, để rồi tình yêu cứ thế lớn lên lúc nào chẳng hay.",
    ],
  },
  {
    year: "2026",
    emoji: "🎊",
    title: "Viết tiếp câu chuyện mang tên Gia đình",
    desc: [
      "Ba năm bên nhau, từ hai người từng chẳng biết gì về nhau, chúng mình đã cùng đi qua những ngày vui buồn, cùng sẻ chia những ước mơ, hoài bão và cả những điều bình dị nhất trong cuộc sống.",
      "Mỗi người đều có một hành trình riêng, nhưng giờ đây, chúng mình chọn cùng nhau viết nên một hành trình chung.",
      "Không chỉ là người yêu, mà sẽ trở thành người bạn đồng hành, người thân thương nhất, cùng nắm tay nhau xây dựng một mái ấm nhỏ, nơi có yêu thương, sẻ chia và những giấc mơ chung.",
      "Và ngày 17/11/2026, chúng mình sẽ chính thức mở ra chương mới của cuộc đời – chương mang tên Hôn nhân.",
      "Từ hai con đường riêng, nay chung một hướng đi. Từ hai trái tim, nay chung một mái nhà.",
      "Cảm ơn vì đã gặp nhau, vì đã chọn nhau và vì sẽ cùng nhau đi hết hành trình phía trước. ❤️",
    ],
  },
];

export default function OurStory() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      className="our-story-bg"
      ref={sectionRef}
      id="our-story"
      data-wipe="right"
    >
      <div className="section">
        <div className="reveal" style={{ textAlign: "center" }}>
          <span className="section-label">Câu Chuyện Của Chúng Mình</span>
          <h2 className="section-title">Hành Trình Tình Yêu</h2>
          <div className="section-divider" />
        </div>

        <div className="timeline">
          {MILESTONES.map((m, i) => (
            <div
              key={m.year}
              className={`timeline-item reveal reveal-delay-${i + 1} ${
                i % 2 === 0 ? "tl-left reveal-left" : "tl-right reveal-right"
              }`}
            >
              <div className="timeline-card">
                <span className="tl-emoji">{m.emoji}</span>
                <span className="tl-year">{m.year}</span>
                <h3 className="tl-title">{m.title}</h3>
                {m.desc.map((para, j) => (
                  <p key={j} className="tl-desc">
                    {para}
                  </p>
                ))}
              </div>
              <div className="timeline-dot" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
