"""Generate clearly fictional PDF and WebP assets for the three demo records."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor

ROOT = Path(__file__).resolve().parents[1] / "public" / "certificates"
DEMO = [
    ("google-ai-essentials", "Google AI Essentials", "Google", "2026", "#e8e9df"),
    ("product-analytics", "Product Analytics", "Learning Studio", "2025", "#e7e8dc"),
    ("system-design-fundamentals", "System Design Fundamentals", "Engineering Academy", "2024", "#e9e6dc"),
]

def font(size, bold=False):
    name = "arialbd.ttf" if bold else "arial.ttf"
    try:
        return ImageFont.truetype(f"C:/Windows/Fonts/{name}", size)
    except OSError:
        return ImageFont.load_default()

for slug, title, institution, year, bg in DEMO:
    folder = ROOT / slug
    folder.mkdir(parents=True, exist_ok=True)
    image = Image.new("RGB", (1200, 830), bg)
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((110, 90, 1090, 740), radius=8, fill="#fafaf7", outline="#c5cbbd", width=2)
    draw.line((170, 170, 1030, 170), fill="#74816a", width=3)
    draw.text((170, 206), "LEARNING VAULT  /  DEMONSTRAÇÃO", fill="#758367", font=font(23, True))
    draw.text((170, 300), "CERTIFICADO", fill="#313a30", font=font(56, True))
    draw.text((170, 375), title, fill="#333b31", font=font(38, True))
    draw.text((170, 450), institution, fill="#6f796b", font=font(26))
    draw.line((170, 570, 1030, 570), fill="#d5d9cc", width=2)
    draw.text((170, 605), f"EXEMPLO FICTÍCIO   •   {year}", fill="#a06e4d", font=font(23, True))
    image.save(folder / "preview.webp", "WEBP", quality=88)

    pdf = canvas.Canvas(str(folder / "certificate.pdf"), pagesize=(842, 595))
    pdf.setFillColor(HexColor("#f5f3ee"))
    pdf.rect(0, 0, 842, 595, fill=1, stroke=0)
    pdf.setFillColor(HexColor("#ffffff"))
    pdf.rect(65, 65, 712, 465, fill=1, stroke=0)
    pdf.setStrokeColor(HexColor("#a5ae9d"))
    pdf.rect(65, 65, 712, 465, fill=0, stroke=1)
    pdf.setFillColor(HexColor("#53624c"))
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(110, 475, "LEARNING VAULT / DEMONSTRACAO")
    pdf.setFillColor(HexColor("#30382f"))
    pdf.setFont("Helvetica-Bold", 34)
    pdf.drawString(110, 380, "CERTIFICADO")
    pdf.setFont("Helvetica-Bold", 23)
    pdf.drawString(110, 325, title)
    pdf.setFont("Helvetica", 16)
    pdf.drawString(110, 286, institution)
    pdf.setFont("Helvetica-Bold", 13)
    pdf.setFillColor(HexColor("#a06e4d"))
    pdf.drawString(110, 130, f"EXEMPLO FICTICIO  /  {year}")
    pdf.save()
