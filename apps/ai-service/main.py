from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel, HttpUrl
from typing import List, Optional, Dict
import uvicorn
import random
import re

app = FastAPI(title="Insight AI - NLP Analysis Engine", version="1.2.0")

class AnalysisRequest(BaseModel):
    content: str
    brand_name: str
    competitors: List[str]

class MentionDetail(BaseModel):
    entity: str
    type: str # 'brand' or 'competitor'
    sentiment: float
    position: int
    context: str

class CitationDetail(BaseModel):
    url: str
    title: Optional[str]
    domain: str
    authority: float

class RecommendationDetail(BaseModel):
    type: str
    priority: str
    title: str
    content: str

class FullAnalysisResult(BaseModel):
    overall_sentiment: float
    mentions: List[MentionDetail]
    citations: List[CitationDetail]
    geo_score: float
    recommendations: List[RecommendationDetail]

@app.post("/analyze", response_model=FullAnalysisResult)
async def analyze_ai_response(request: AnalysisRequest):
    """
    Core NLP pipeline for parsing AI search engine responses.
    """
    content = request.content
    brand = request.brand_name
    competitors = request.competitors

    # 1. Extraction Logic (Simulated for MVP, would use spaCy/Transformers)
    mentions = []
    
    # Detect brand mentions
    for m in re.finditer(re.escape(brand), content, re.IGNORECASE):
        mentions.append(MentionDetail(
            entity=brand,
            type="brand",
            sentiment=random.uniform(0.1, 0.9),
            position=m.start(),
            context=content[max(0, m.start()-50):min(len(content), m.end()+50)]
        ))

    # Detect competitor mentions
    for comp in competitors:
        for m in re.finditer(re.escape(comp), content, re.IGNORECASE):
            mentions.append(MentionDetail(
                entity=comp,
                type="competitor",
                sentiment=random.uniform(-0.5, 0.5),
                position=m.start(),
                context=content[max(0, m.start()-50):min(len(content), m.end()+50)]
            ))

    # 2. Citation Parsing
    # Example regex for URLs: http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+
    urls = re.findall(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', content)
    citations = []
    for url in set(urls):
        domain = re.search(r'https?://(?:www\.)?([^/]+)', url).group(1)
        citations.append(CitationDetail(
            url=url,
            title=f"Source on {domain}",
            domain=domain,
            authority=random.uniform(0.3, 0.95)
        ))

    # 3. GEO Scoring Logic (Weighted formula)
    # Weights: Mention Count (0.3), Avg Sentiment (0.3), Citation Authority (0.4)
    brand_mentions = [m for m in mentions if m.type == "brand"]
    avg_sentiment = sum(m.sentiment for m in brand_mentions) / len(brand_mentions) if brand_mentions else 0
    avg_authority = sum(c.authority for c in citations) / len(citations) if citations else 0
    
    # Normalized GEO Score (0-100)
    mention_factor = min(len(brand_mentions) * 20, 100) * 0.3
    sentiment_factor = ((avg_sentiment + 1) / 2 * 100) * 0.3
    authority_factor = (avg_authority * 100) * 0.4
    geo_score = mention_factor + sentiment_factor + authority_factor

    # 4. Strategic Recommendations
    recommendations = []
    if len(brand_mentions) < 2:
        recommendations.append(RecommendationDetail(
            type="strategic",
            priority="high",
            title="Increase Brand Presence",
            content=f"Your brand was only mentioned {len(brand_mentions)} times. Consider updating your site content to be more factual and 'scrappable' for AI engines."
        ))
    
    if avg_authority < 0.6:
        recommendations.append(RecommendationDetail(
            type="citation",
            priority="medium",
            title="Build Authority Backlinks",
            content="AI engines are citing low-authority domains for your brand. Aim for mentions in tier-1 publications."
        ))

    return FullAnalysisResult(
        overall_sentiment=avg_sentiment,
        mentions=mentions,
        citations=citations,
        geo_score=round(geo_score, 2),
        recommendations=recommendations
    )

@app.get("/health")
async def health_check():
    return {"status": "healthy", "engine": "NLP-V1"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
