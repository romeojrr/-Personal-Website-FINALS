import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateEntryDto } from './dto/create-entry.dto';

@Injectable()
export class GuestbookService {
  constructor(private readonly supabase: SupabaseService) {}

  async findAll() {
    const { data, error } = await this.supabase
      .getClient()
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async create(dto: CreateEntryDto) {
    const { data, error } = await this.supabase
      .getClient()
      .from('guestbook')
      .insert([{ name: dto.name, message: dto.message }])
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }
}
