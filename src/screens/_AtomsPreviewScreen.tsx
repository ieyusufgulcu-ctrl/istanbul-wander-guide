import {
  Bookmark,
  Calendar,
  Clock,
  Flame,
  Heart,
  MapPin,
  Search,
  Share2,
  Sparkles,
  Users,
  Utensils,
} from "lucide-react";
import { Screen, Section, TopBar, HorizontalScroller } from "@/components/primitives";
import {
  Avatar,
  Badge,
  Button,
  Chip,
  IconButton,
  MetadataRow,
  Pill,
  PriceBlock,
  RatingRow,
  Tag,
  VerifiedBadge,
} from "@/components/atoms";

/**
 * Internal-only preview of the atom layer. This file is *not* a product screen
 * and will be removed once real screens are built. It exists so the design
 * system can be reviewed in the running prototype.
 */
export default function AtomsPreviewScreen() {
  return (
    <Screen
      tone="default"
      topBar={
        <TopBar
          eyebrow="Tasarım Sistemi"
          title="Atom katmanı"
          right={
            <>
              <IconButton icon={<Search />} label="Ara" variant="ghost" />
              <IconButton icon={<Bookmark />} label="Kaydet" variant="ghost" badged />
            </>
          }
        />
      }
    >
      {/* Buttons */}
      <Section eyebrow="Düğmeler" title="Button" flushTop>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary">Rezerve Et</Button>
          <Button variant="gold" leading={<Sparkles />}>Sana Özel</Button>
          <Button variant="secondary">Detaylar</Button>
          <Button variant="outline">Paylaş</Button>
          <Button variant="ghost">Vazgeç</Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm">Küçük</Button>
          <Button size="md">Orta</Button>
          <Button size="lg">Geniş</Button>
          <Button size="xl" variant="primary" block leading={<Sparkles />}>
            Hemen Rezerve Et
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button loading>Yükleniyor</Button>
          <Button disabled>Pasif</Button>
          <Button variant="destructive">İptal Et</Button>
        </div>
      </Section>

      {/* IconButton */}
      <Section eyebrow="İkon Düğmeleri" title="IconButton">
        <div className="flex items-center gap-3">
          <IconButton icon={<Heart />} label="Kaydet" variant="ghost" />
          <IconButton icon={<Share2 />} label="Paylaş" variant="solid" />
          <IconButton icon={<Heart />} label="Kaydedildi" variant="solid" active />
          <IconButton icon={<Bookmark />} label="Liste" variant="glass" badged />
          <IconButton icon={<Sparkles />} label="Öner" variant="gold" />
        </div>
      </Section>

      {/* Pills */}
      <Section eyebrow="Kategori Sekmeleri" title="Pill" bleed>
        <HorizontalScroller>
          <Pill selected icon={<Sparkles />}>Sana Özel</Pill>
          <Pill icon={<Utensils />} count={42}>Gastronomi</Pill>
          <Pill icon={<Flame />}>Bu Hafta</Pill>
          <Pill>Sanat & Zanaat</Pill>
          <Pill>Wellness</Pill>
          <Pill>Mahalle Turları</Pill>
        </HorizontalScroller>
      </Section>

      {/* Chips */}
      <Section eyebrow="Filtreler" title="Chip">
        <div className="flex flex-wrap gap-2">
          <Chip selected>Kadıköy</Chip>
          <Chip selected>Akşam</Chip>
          <Chip>Karaköy</Chip>
          <Chip>Balat</Chip>
          <Chip>Üsküdar</Chip>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip removable selected onRemove={() => {}}>Kadıköy</Chip>
          <Chip removable selected onRemove={() => {}}>2 sa altı</Chip>
          <Chip removable selected onRemove={() => {}}>500 ₺ altı</Chip>
        </div>
      </Section>

      {/* Badges */}
      <Section eyebrow="Durum" title="Badge">
        <div className="flex flex-wrap gap-2">
          <Badge tone="gold" dot>Yeni</Badge>
          <Badge tone="success" dot>Yer Var</Badge>
          <Badge tone="warning">Az Kaldı</Badge>
          <Badge tone="danger">Tükendi</Badge>
          <Badge tone="navy">Editör Seçimi</Badge>
          <Badge tone="soft">Doğrulanmış Mekân</Badge>
          <Badge tone="gold" eyebrow>Premium</Badge>
        </div>
      </Section>

      {/* Tags */}
      <Section eyebrow="Etiketler" title="Tag (medya üstü)">
        <div className="flex flex-wrap gap-2">
          <Tag tone="media" icon={<MapPin />}>Karaköy</Tag>
          <Tag tone="media" icon={<Clock />}>2 sa</Tag>
          <Tag tone="gold">Editör Seçimi</Tag>
          <Tag tone="navy">Sınırlı Kontenjan</Tag>
          <Tag tone="neutral">Türkçe</Tag>
        </div>
      </Section>

      {/* Avatar */}
      <Section eyebrow="Profil" title="Avatar">
        <div className="flex items-end gap-3">
          <Avatar name="Elif Yılmaz" size="xs" />
          <Avatar name="Mehmet Demir" size="sm" />
          <Avatar name="Ayşe Kaya" size="md" />
          <Avatar name="Selin Aydın" size="lg" ring />
          <Avatar name="Cem Tan" size="xl" ring />
        </div>
      </Section>

      {/* VerifiedBadge */}
      <Section eyebrow="Güven" title="VerifiedBadge">
        <div className="flex flex-wrap items-center gap-3">
          <VerifiedBadge variant="inline" />
          <VerifiedBadge variant="pill" />
          <VerifiedBadge variant="pill" size="lg" label="Doğrulanmış Organizatör" />
          <VerifiedBadge variant="icon" />
        </div>
      </Section>

      {/* RatingRow */}
      <Section eyebrow="Değerlendirmeler" title="RatingRow">
        <div className="space-y-2">
          <RatingRow value={4.9} count={1284} size="lg" showCountLabel />
          <RatingRow value={4.7} count={326} />
          <RatingRow value={4.2} count={48} size="sm" />
        </div>
      </Section>

      {/* MetadataRow */}
      <Section eyebrow="Üst veri" title="MetadataRow">
        <div className="space-y-2.5">
          <MetadataRow
            items={[
              { icon: <MapPin />, label: "Karaköy", emphasis: true },
              { icon: <Clock />, label: "2 sa" },
              { icon: <Users />, label: "1–6 kişi" },
            ]}
          />
          <MetadataRow
            size="sm"
            items={[
              { icon: <Calendar />, label: "Cumartesi" },
              { icon: <Clock />, label: "18:30" },
              { label: "Türkçe & İngilizce" },
            ]}
          />
        </div>
      </Section>

      {/* PriceBlock */}
      <Section eyebrow="Fiyat" title="PriceBlock">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-border/60 p-3">
            <PriceBlock amount={450} perLabel="kişi başı" size="sm" />
          </div>
          <div className="rounded-2xl border border-border/60 p-3">
            <PriceBlock amount={1250} fromLabel perLabel="kişi başı" />
          </div>
          <div className="rounded-2xl border border-border/60 p-3">
            <PriceBlock amount={0} free size="sm" />
          </div>
          <div className="col-span-2 rounded-2xl border border-border/60 p-3">
            <PriceBlock
              amount={890}
              originalAmount={1100}
              perLabel="kişi başı · vergiler dahil"
              size="lg"
            />
          </div>
          <div className="rounded-2xl border border-border/60 p-3 flex items-center justify-end">
            <PriceBlock amount={2400} perLabel="toplam" align="right" />
          </div>
        </div>
      </Section>
    </Screen>
  );
}