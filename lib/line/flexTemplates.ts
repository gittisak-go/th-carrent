export type ProfileFlexOptions = {
  title?: string;
  name?: string;
  subtitle?: string;
  imageUrl?: string;
  websiteUrl?: string;
  registerUrl?: string;
  phone?: string;
};

export function buildProfileFlex(opts: ProfileFlexOptions = {}) {
  const {
    title = 'Flex Message Corp',
    name = 'นางน้อย',
    subtitle = 'แอดมินเพจ',
    imageUrl = 'https://raw.githubusercontent.com/gittisak-go/th-carrent/main/docs/assets/nang-noi.jpg',
    websiteUrl = 'https://example.com',
    registerUrl = 'https://example.com/register',
    phone = '+66000000000'
  } = opts;

  return {
    type: 'bubble',
    size: 'mega',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            { type: 'text', text: title, weight: 'bold', size: 'lg', color: '#ffffff' }
          ],
          backgroundColor: '#00b050',
          paddingAll: '12px',
          cornerRadius: '8px'
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            { type: 'image', url: imageUrl, size: 'xxl', aspectMode: 'cover', aspectRatio: '1:1', align: 'center', gravity: 'center', cornerRadius: '48px' }
          ],
          margin: 'lg',
          alignItems: 'center'
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            { type: 'text', text: name, weight: 'bold', size: 'xl', margin: 'md', align: 'center' },
            { type: 'text', text: subtitle, size: 'sm', color: '#666666', align: 'center', wrap: true }
          ],
          margin: 'md'
        }
      ],
      spacing: 'md'
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      contents: [
        { type: 'button', style: 'primary', color: '#00b050', action: { type: 'uri', label: 'Visit our website', uri: websiteUrl }, height: 'sm' },
        { type: 'button', style: 'secondary', action: { type: 'uri', label: 'Register with us', uri: registerUrl }, height: 'sm', margin: 'sm' },
        { type: 'button', style: 'secondary', action: { type: 'uri', label: 'Call Us Now', uri: `tel:${phone}` }, height: 'sm', margin: 'sm' }
      ],
      spacing: 'sm'
    }
  } as const;
}

// Example usage:
// import { buildProfileFlex } from 'lib/line/flexTemplates';
// const bubble = buildProfileFlex({ name: 'Gittisak', imageUrl: 'https://...'});
// messagingClient.pushMessage(userId, { type: 'flex', altText: 'Profile', contents: bubble });
