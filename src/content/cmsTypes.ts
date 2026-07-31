export type CmsPrimitive = string | number | boolean | null;
export type CmsJson = CmsPrimitive | CmsJson[] | { [key: string]: CmsJson };

export type CmsEntryKind = 'section' | 'collection' | 'settings' | 'gallery';

export type CmsEntryDefinition = {
  key: string;
  group: string;
  label: string;
  description: string;
  kind: CmsEntryKind;
  value: CmsJson;
};

export type CmsEntryRecord = {
  id: string;
  key: string;
  group_name: string;
  label: string;
  description: string | null;
  kind: CmsEntryKind;
  sort_order: number;
  draft_value: CmsJson;
  published_value: CmsJson | null;
  updated_at: string;
  published_at: string | null;
};

export type CmsMediaAsset = {
  id: string;
  storage_path: string;
  public_url: string;
  media_type: 'image' | 'video';
  mime_type: string;
  original_name: string;
  size_bytes: number;
  alt_text: string | null;
  created_at: string;
};

export type CmsPublishedMap = Record<string, CmsJson>;
